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

  inserisciNelDatabase() {
    // Implementazione della funzione per inserire dati nel database
    console.log('Funzione per inserire dati nel database non implementata.');
    this._testSvc.inserisciNelDatabase().subscribe({
      next: (response) => {
        console.log('Dati inseriti nel database con successo:', response);
      },
      error: (err) => {
        console.error(
          "Errore durante l'inserimento dei dati nel database:",
          err
        );
      },
    });
  }

  listaFile() {
    // Implementazione della funzione per elencare i file nello storage
    console.log('Funzione per elencare i file nello storage non implementata.');
    this._testSvc.listaFile().subscribe({
      next: (response) => {
        console.log('Lista dei file nello storage:', response);
      },
      error: (err) => {
        console.error('Errore durante il recupero della lista dei file:', err);
      },
    });
  }

  eliminaFile() {
    // Implementazione della funzione per eliminare un file dallo storage
    console.log(
      'Funzione per eliminare un file dallo storage non implementata.'
    );
  }

  uploadFile($event: any) {
    // Implementazione della funzione per caricare un file nello storage
    console.log(
      'Funzione per caricare un file nello storage non implementata.'
    );
    const file: File = $event.target.files[0];
    if (file) {
      this._testSvc.uploadFile(file).subscribe({
        next: (response) => {
          console.log('File caricato con successo:', response);
        },
        error: (err) => {
          console.error('Errore durante il caricamento del file:', err);
        },
      });
    }
  }
}
