import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform, ToastController} from 'ionic-angular';

import { HistorialProvider } from '../../providers/historial/historial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, 
              private toastCtrl: ToastController,
              private platform: Platform,
              private _historialProvider: HistorialProvider
              ) {}

  scan(){
    console.log('realizando Scan...');
    
    if(!this.platform.is('cordova')){
      this._historialProvider.agregar_historial("http://google.com");
      return;
    }
    this.barcodeScanner.scan().then( (barcodeData) =>{
      console.log("Data del scan:", barcodeData );
      console.log('result', barcodeData.text);
      console.log('format', barcodeData.format);
      console.log('cancelled', barcodeData.cancelled);
      this.mostrar_error("Resultado" + barcodeData.text);

      if( barcodeData.cancelled == 0 && barcodeData.text != null)
      {
        this._historialProvider.agregar_historial(barcodeData.text)
      }

    }, (err)=>{
      console.log("error", err);
      this.mostrar_error("Error: "+ err);
    });
  }
  mostrar_error(mensaje:string)
  {
    let toast = this.toastCtrl.create({
      message: mensaje, 
      duration: 3000
    });
    toast.present();
  }

}
