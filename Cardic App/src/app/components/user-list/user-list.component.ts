import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  {

  users: any = [];
  userr = {};

  constructor(private usersService: UsersService, private navCtrl: NavController, private Alerta: AlertController, private http: HttpClient ) {

  }

  ionViewWillEnter(){
    this.userr = this.usersService.user;
    console.log('user', this.userr)
    this.usersService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => console.log(err)
    )
  }


  async userAlert() {
    const alert = await this.Alerta.create({
      header: 'Confirmar',
      message: 'Confirmar contraseña para continuar',
      inputs: [
        {
          name: 'id',
          placeholder: 'ID',
        },
        {
          name: 'clave',
          placeholder: 'clave',
          type: "password"
        }
      ],
      buttons: [
        {
      text: 'Comprobar',
      role: 'submit',
      handler: ((inputs: {id : string, clave : string})=> {
          this.http.post('http://10.12.18.243:3000/API/user/user', { id: inputs.id, clave: inputs.clave })
            .subscribe(value => {
              console.log(value);
              this.usersService.user = value['user'];
              if (value['ok']) {
                this.navCtrl.navigateForward('act');
              }
            });
        })
      }]
      
    })
  
      await alert.present();
  }

  edit(){
      this.userAlert();
    //this.navCtrl.navigateForward('act');
  }
}
