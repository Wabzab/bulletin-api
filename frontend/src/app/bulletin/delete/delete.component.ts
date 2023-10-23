import { Component, Inject } from '@angular/core';
import { BulletinService } from '../bulletin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    public bulletinService: BulletinService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) { }

  onCancelClick() {
    this.dialogRef.close()
  }

  onDeleteClick() {
    this.bulletinService.deleteBulletin(this.data.id)
    this.dialogRef.close()
  }
}
