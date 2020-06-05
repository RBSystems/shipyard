import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from 'src/app/services/api.service';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {
  room: Room;
  newRoom: boolean;
  tagKey: String;
  tagValue: String;

  constructor(private dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Room) {
    if (data != null) {
      this.room = data;
      this.newRoom = false;
    } else {
      this.room = {
        ID: "",
        Desc: "",
        Tags: new Map()
      }
      this.newRoom = true;
    }
  }

  ngOnInit(): void {
  }

  addTag() {
    this.room.Tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    this.room.Tags.delete(key);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onDelete() {
    this.dialogRef.close("delete");
  }

  onSave() {
    this.dialogRef.close(this.room);
  }

}