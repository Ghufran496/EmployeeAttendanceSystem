import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-leave',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-leave.component.html',
  styleUrl: './update-leave.component.css',
})
export class UpdateLeaveComponent {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  singleLeave: any;
  leaveStatus = new FormControl('');

  updateLeaveForm = new FormGroup({
    leaveStatus: this.leaveStatus,
  });

  ngOnInit() {
    const leaveId = this.route.snapshot.paramMap.get('id');
    this.adminService.getSingleUserLeaveById(leaveId).subscribe(
      (data: any) => {
        this.updateLeaveForm.patchValue({
          leaveStatus: data.leaveStatus,
        });
        this.singleLeave = data;
        console.log(this.singleLeave);
      },
      (err) => {
        console.log('Error fetching user salary by Id:', err);
      }
    );
  }

  onReset() {
    this.updateLeaveForm.reset();
  }

  onSubmit() {
    if (this.updateLeaveForm.valid) {
      const updatedLeavestatus = this.updateLeaveForm.value;
      const leaveId = this.route.snapshot.paramMap.get('id');

      //console.log(updatedLeavestatus)
      const updatedLeave = {
        allowedLeaves: this.singleLeave.allowedLeaves,
        leaveStatus: updatedLeavestatus.leaveStatus,
        reason: this.singleLeave.reason,
      };

      // console.log(updatedLeave)
      this.adminService.updateUserLeaveById(leaveId, updatedLeave).subscribe(
        (response) => {
          //console.log('Salary updated successfully:', response);
          alert('Leave updated successfully');
        },
        (err) => {
          console.log('Error updating leave:', err);
        }
      );
    }
  }
}
