// solicitudes-de-servicio.component.ts
import { Component, ElementRef, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import io from 'socket.io-client';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-solicitudes-de-servicio',
  templateUrl: './solicitudes-de-servicio.component.html',
  styleUrls: ['./solicitudes-de-servicio.component.css']
})
export class SolicitudesDeServicioComponent implements OnInit {
  private socket: any;
  public username: string = '';

  constructor(
    private elementRef: ElementRef,
    private servicioSeguridad: SeguridadService
    ) {}

  async ngOnInit() {
    this.socket = io('http://localhost:3010');
    this.username = await this.getUserName();
    this.socket.emit('join', this.username);

    this.socket.on('message', (data: any) => {
      this.displayMessage(data);
    });

    this.socket.on('privateMessage', (data: any) => {
      this.displayPrivateMessage(data);
    });

    this.socket.on('messageDeleted', (messageId: string) => {
      this.removeMessage(messageId);
    });
  }

  ngAfterViewInit() {
    M.FormSelect.init(this.elementRef.nativeElement.querySelectorAll('select'), {});
  }

  async getUserName(): Promise<string> {
    let correo = this.servicioSeguridad.obtenerCorreo();
    let conductorId = await this.servicioSeguridad.findByIdConductor(correo);
    if (conductorId == undefined) {
      return "undefined";
    } else {
      return conductorId.toString();
    }
  }
/*
  displayMessage(data: any) {
    const user = data.message.user;
    const message = data.message.message;
    const messageId = data.messageId;
    const li = document.createElement('li');
    li.setAttribute('id', messageId);
    li.innerHTML = <div><strong>${messageId}:</strong> ${message}\n <button (click)="deleteMessage('${messageId}')">Asignar</button></div>;
    const messageList = document.getElementById('messageList');
    if (messageList) {
      messageList.appendChild(li);
    }
}


  deleteMessage(messageId: string) {
    const messageElement = document.getElementById(messageId);
    alert('llega hasta deleteMesage');
    if (messageElement) {
      messageElement.remove();
      this.socket.emit('deleteMessage', messageId);
      alert('Viaje asignado con éxito');
    }
  }
  */
  public messages: any[] = [];
  displayMessage(data: any) {
    const user = data.message.user;
    const message = data.message.message;
    const messageId = data.messageId;
    
    this.messages.push({ user, message, messageId });
  }

  displayPrivateMessage(data: any) {
    const message = data.message;
    const messageId = data.messageId;
    const li = document.createElement('li');
    li.setAttribute('id', messageId);
    
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    
    const strong = document.createElement('strong');
    strong.textContent = `${messageId}:`;
    
    const span = document.createElement('span');
    span.textContent = message;
    
    const button = document.createElement('button');
    button.textContent = 'Asignar';
    button.addEventListener('click', () => this.deleteMessage(messageId));
  
    div.appendChild(strong);
    div.appendChild(span);
    div.appendChild(button);
  
    li.appendChild(div);
  
    const privateMessagesElement = document.getElementById('privateMessages');
    if (privateMessagesElement) {
      privateMessagesElement.appendChild(li);
    }
  }

  async deleteMessage(index: number) {
    //const messageId = this.messages[index].messageId;
    this.messages.splice(index, 1);

    let correo = this.servicioSeguridad.obtenerCorreo();
    let conductorId = await this.servicioSeguridad.findByIdConductor(correo);

    console.log('correo: ' + correo);
    console.log('conductorId: ' + conductorId);


    let datos = {
      viajeId: index,
      conductorId: conductorId,
    };

    this.servicioSeguridad.asignarViaje(datos);
    // Realiza la petición al servidor para eliminar el mensaje
    this.socket.emit('deleteMessage', index);
    alert('Viaje asignado con éxito');
  }

  removeMessage(messageId: string) {
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
      messageElement.remove();
    }
  }
}