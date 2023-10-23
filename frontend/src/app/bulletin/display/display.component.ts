import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BulletinService } from '../bulletin.service';
import { AuthService } from 'src/app/auth/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { DeleteComponent } from '../delete/delete.component';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['departments', 'issue', 'action']
  posts: { _id: string, departments: string[], issue: string, __v: string }[] = []

  constructor(public bulletinService: BulletinService, public authService: AuthService, public dialog: MatDialog) { }
  private bulletinSubscription!: Subscription;

  @ViewChild(MatTable) table?: MatTable<any>

  ngOnInit(): void {
    this.bulletinService.getBulletins();
    this.bulletinSubscription = this.bulletinService.getUpdateListener()
      .subscribe((posts: { _id: string, departments: string[], issue: string, __v: string }[]) => {
        this.posts = posts;
        this.table?.renderRows()
      })
  }

  ngOnDestroy(): void {
    this.bulletinSubscription.unsubscribe()
  }

  createPost() {
    const dialogRef = this.dialog.open(CreateComponent)
  }

  deletePost(post: { _id: string, departments: string[], issue: string, __v: string }) {
    const dialogRef = this.dialog.open(DeleteComponent, { data: { id: post._id } })
  }

}
