import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-salary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-salary.component.html',
  styleUrl: './update-salary.component.css',
})
export class UpdateSalaryComponent {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  netSalary = new FormControl('');
  Allowances = new FormControl('');
  payMethod = new FormControl('');

  updateSalaryForm = new FormGroup({
    netSalary: this.netSalary,
    allowances: this.Allowances,
    payMethod: this.payMethod,
  });

  ngOnInit() {
    const salaryId = this.route.snapshot.paramMap.get('id');
    this.adminService.getUserSalById(salaryId).subscribe(
      (data: any) => {
        this.updateSalaryForm.patchValue({
          netSalary: data.netSalary,
          allowances: data.allowances,
          payMethod: data.payMethod,
        });
        // console.log(data);
      },
      (err) => {
        console.log('Error fetching user salary by Id:', err);
      }
    );
  }

  onReset() {
    this.updateSalaryForm.reset();
  }

  onSubmit() {
    if (this.updateSalaryForm.valid) {
      const updatedSalary = this.updateSalaryForm.value;
      const salaryId = this.route.snapshot.paramMap.get('id');
      this.adminService.updateUserSalById(salaryId, updatedSalary).subscribe(
        (response) => {
          //console.log('Salary updated successfully:', response);
          alert("Salary updated successfully");
        },
        (err) => {
          console.log('Error updating salary:', err);
        }
      );
    }
  }

}
