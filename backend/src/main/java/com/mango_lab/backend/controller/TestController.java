package com.mango_lab.backend.controller;

import com.mango_lab.backend.entity.MyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private S3Client s3Client;

    @Value("${s3.bucket}")
    private String bucket;

    @Autowired
    private com.mango_lab.backend.repository.MyRepository myRepository;

    @GetMapping("/status/db")
    public ResponseEntity<Map<String, Object>> getDatabaseStatus() {
        Map<String, Object> response = new HashMap<>();
        try (Connection conn = dataSource.getConnection()) {
            boolean valid = conn.isValid(2); // timeout di 2s
            response.put("status", valid ? "ok" : "ko");
            response.put("message", "Database connection is " + (valid ? "valid" : "invalid"));
            if (valid) {
                response.put("database", conn.getMetaData().getDatabaseProductName());
                response.put("version", conn.getMetaData().getDatabaseProductVersion());
            }
            return ResponseEntity.ok(response);
        } catch (SQLException e) {
            response.put("status", "ko");
            response.put("message", "Database connection failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }

    @GetMapping("/status/storage")
    public ResponseEntity<Map<String, String>> checkStorage() {
        Map<String, String> response = new HashMap<>();
        try {
            s3Client.listObjectsV2(ListObjectsV2Request.builder().bucket(bucket).maxKeys(1).build());
            response.put("status", "ok");
            response.put("message", "Storage access successful");
            return ResponseEntity.ok(response);
        } catch (S3Exception e) {
            response.put("status", "ko");
            response.put("message", "Storage access failed: " + e.awsErrorDetails().errorMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }

    @PostMapping("/db/insert")
    public ResponseEntity<Map<String, String>> insert() {
        MyEntity entity = new MyEntity();
        entity.setValue("Test " + LocalDateTime.now());
        myRepository.save(entity);
        return ResponseEntity.ok(Map.of("status", "ok", "message", "Entity inserted successfully"));
    }

    @PostMapping("/storage/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String filename = "test-upload/" + file.getOriginalFilename();
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(filename)
                        .contentType(file.getContentType()).build(),
                software.amazon.awssdk.core.sync.RequestBody.fromBytes(file.getBytes())
        );
        return ResponseEntity.ok(Map.of("status", "ok", "message", "File uploaded successfully", "filename", filename));
    }

    @GetMapping("/storage/list")
    public ResponseEntity<List<String>> listFiles() {
        ListObjectsV2Response objects = s3Client.listObjectsV2(
                ListObjectsV2Request.builder().bucket(bucket).prefix("test-upload/").build()
        );
        List<String> fileNames = objects.contents().stream().map(S3Object::key).toList();
        return ResponseEntity.ok(fileNames);
    }


}
