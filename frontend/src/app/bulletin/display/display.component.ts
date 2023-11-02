import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BulletinService } from '../bulletin.service';
import { AuthService } from 'src/app/auth/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { DeleteComponent } from '../delete/delete.component';
import { MatTable } from '@angular/material/table';
import { departmentOptions } from 'src/constants/department-constants';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnDestroy {

  departmentOptions: string[] = departmentOptions;
  public departmentFilters = new FormControl('');

  displayedColumns: string[] = ['departments', 'issue', 'action'];
  posts: { _id: string, departments: string[], issue: string, __v: string }[] = [];
  filteredPosts: { _id: string, departments: string[], issue: string, __v: string }[] = [];

  constructor(
    public bulletinService: BulletinService,
    public authService: AuthService,
    public dialog: MatDialog
  ) { }
  private bulletinSubscription!: Subscription;

  @ViewChild(MatTable) table?: MatTable<any>

  ngOnInit(): void {
    this.bulletinService.getBulletins();
    this.bulletinSubscription = this.bulletinService.getUpdateListener()
      .subscribe((posts: { _id: string, departments: string[], issue: string, __v: string }[]) => {
        this.posts = posts;
        this.filteredPosts = posts;
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

  onFilterClicked() {
    if (this.departmentFilters.value?.length == 0) {
      this.filteredPosts = this.posts;
      this.table?.renderRows();
      return;
    }
    let filters = String(this.departmentFilters.value).split(',');
    this.filteredPosts = [];
    this.posts.forEach(post => {
      let included = false;
      post.departments.forEach(department => {
        if (filters.includes(department) && included == false) {
          this.filteredPosts.push(post);
          included = true;
        }
      })
    })
    this.table?.renderRows();
  }

  checkDepartments(post: { _id: string, departments: string[], issue: string, __v: string }) {
    console.log(this.displayedColumns);
    console.log(this.departmentFilters.value);
    let filters = this.departmentFilters.value ? this.departmentFilters.value : '';
    let included = false;
    String(filters).split(',').forEach(filter => {
      if (post.departments.includes(filter)) {
        console.log("Matched!");
        included = true;
      }
    });
    return included;
  }

}
