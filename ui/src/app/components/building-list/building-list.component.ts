import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Building, ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { BuildingDialogComponent } from '../building-dialog/building-dialog.component';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {

  buildings: Building[];

  constructor(private router: Router,
    private api: ApiService,
    private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.buildings = this.api.getBuildings();
  }

  getImage(bldgID: String): String{
    return "assets/bldgImages/" + bldgID + ".jpg";
  }

  routeToRoomList(bldgID) {
    console.log(bldgID);
    this.router.navigate(["/campus/" + bldgID + "/roomList"]);
  }

  editBuilding(b: Building) {
    const dialog = this.dialogRef.open(BuildingDialogComponent, {
      data: b
    });

    dialog.afterClosed().subscribe(result => {
      if (result == "delete") {
        console.log("deleting");
      } else if (result != null) {
        this.api.setBuilding(result);
      }
    });
  }

}