import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private domain = `api.skillswap.wip`
  private authUrl = `https://${this.domain}/auth`;
  private apiUrl = `https://${this.domain}/api`;
  public categoriesUrl = `${this.apiUrl}/categories`;
  public usersUrl = `${this.apiUrl}/users`;
  public sheetUrl = `${this.apiUrl}/sheets`;
  public lessonUrl = `${this.apiUrl}/lessons`;
  public messageUrl = `${this.apiUrl}/messages`;
  public participantUrl = `${this.apiUrl}/participants`;
  public conversationUrl = `${this.apiUrl}/conversations`;
}
