import { Component } from '@angular/core';
import { CategoriaService } from './../../services/categoria.service';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage {

  public listaCategorias = [];
  constructor(
    private categoriaService: CategoriaService,
    public toastController: ToastController,
    public alertController: AlertController,

  ) { }

  private carregarLista() {
    this.categoriaService.listar().subscribe(dados => {
      this.listaCategorias = dados['content'];
      this.presentToast('Categorias carregadas');
    });
  }
   ionViewWillEnter() {
     this.carregarLista();
   }

   public deletar(id:number) {
     this.categoriaService.deletar(id).subscribe(dados => {
       this.presentToast('categoria deletada');
       this.carregarLista();
     });
   }

  async presentToast(mensagem: string){
    const toast = await this.toastController.create({
      message:mensagem,
      duration:2000
    });
    toast.present();
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO',
      message: 'deseja realmente excluir? ',
      buttons: [
        {
          text:'não',
          role: 'cancel',
          cssClass: 'secundary'
        },{
          text: 'sim, excluir',
          handler: () => {
            this.deletar(id);
          }
        }
      ]
    });
    await alert.present();
  }

}
