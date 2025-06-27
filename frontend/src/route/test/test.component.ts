import { Component, OnInit } from '@angular/core';
import { TestService } from '../../app/services/test.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  backendStatus!: boolean;
  databaseStatus!: boolean;
  storageStatus!: boolean;

  constructor(private _testSvc: TestService) {}

  ngOnInit(): void {
    this._testSvc.checkBackend().subscribe({
      next: () => {
        this.backendStatus = true;
        console.log('Backend OK');
      },
      error: () => {
        this.backendStatus = false;
        console.log('Backend KO');
      },
    });

    this._testSvc.checkDatabase().subscribe({
      next: () => {
        this.databaseStatus = true;
        console.log('Database OK');
      },
      error: (err) => {
        this.databaseStatus = false;
        console.log('Database KO', err);
      },
    });

    this._testSvc.checkStorage().subscribe({
      next: () => {
        this.storageStatus = true;
        console.log('Storage OK');
      },
      error: (err) => {
        this.storageStatus = false;
        console.log('Storage KO', err);
      },
    });
  }
}
