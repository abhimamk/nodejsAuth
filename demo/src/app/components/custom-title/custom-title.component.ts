import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomTitleService } from './custom-title.service';
import { Title } from './customTitle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-title',
  templateUrl: './custom-title.component.html',
  styleUrls: ['./custom-title.component.css'],
})
export class CustomTitleComponent implements OnInit {
  customTitle: any[] = [];
  customTitleForm: FormGroup;
  titleObj: Title;
  submitted = false;
  itemPerPage = 5;
  pageId1 = 1;
  pageSizes: number;
  cPage: number;
  total: number;
  currentPage = 1;
  searchSe = '';
  sortDir = 1;
  constructor(
    private customTitleService: CustomTitleService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.pagination();
  }

  initForm(): void {
    this.customTitleForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
    });
  }

  get f(): any {
    return this.customTitleForm.controls;
  }

  toasterSuccess(responseGood): any {
    this.toastr.success('', responseGood, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }

  toasterError(responseError): any {
    this.toastr.error('', responseError, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }

  getAllCustomTitle(): void {
    this.customTitleService.getAllCustomTitle().subscribe((res: Title[]) => {
     return this.customTitle = res.reverse();
    });
  }

  pagination(): any {
    this.customTitleService
      .pagination(this.currentPage, this.itemPerPage, this.searchSe)
      .subscribe((res: any) => {
        this.customTitle = res.response.reverse();
        this.pageSizes = res.pages;
        this.cPage = res.page;
        this.total = res.NumberOfTitle;
      });
  }

  pageChanged(value): void {
    this.currentPage = value;
    this.pagination();
  }

  pageSize(value: number): void {
    this.itemPerPage = value;
    this.pagination();
  }

  // Add And Update CustomTitle

  submit(id: string): any {
    this.submitted = true;
    if (this.customTitleForm.invalid) {
      return;
    }
    if (!id) {
      this.addNewTitle(this.customTitleForm.value);
    } else {
      this.updateTitle(id, this.customTitleForm.value);
    }
  }

  addNewTitle(data): void {
    this.customTitleService.AddNewTitle(data).subscribe(
      (res) => {
        this.toasterSuccess(res.message);
      },
      // error
      (error) => {
        this.toasterError(error.error.message);
      },
      // Success
      () => {
        this.pagination();
        this.clear();
      }
    );
  }

  updateTitle(id, data): void {
    this.customTitleService.updateTitle(id, data).subscribe(
      (res) => {
        this.toasterSuccess(res.message);
      },
      // error
      (error) => {
        this.toasterError(error.error.message);
      },
      // Success
      () => {
        this.pagination();
        this.clear();
      }
    );
  }

  // Edit
  edit(item): void {
    this.titleObj = item;
    this.customTitleForm.patchValue({
      title: item.title,
    });
  }

  delete(id): void {
    this.customTitleService.deleteTitle(id).subscribe(
      (res) => {
        this.toasterSuccess(res.message);
      },
      // error
      (error) => {
        this.toasterError(error.error.message);
      },
      // Success
      () => {
        this.pagination();
        this.clear();
      }
    );
  }

  // Search Title
  search(value): any {
    this.searchSe = value;
    this.customTitleService
      .pagination(this.currentPage, this.itemPerPage, this.searchSe)
      .subscribe((res: any) => {
        this.customTitle = res.response.reverse();
        this.pageSizes = res.pages;
        this.cPage = res.page;
        this.total = res.NumberOfTitle;
      });
  }

  onSortClick(event): any {
    const target = event.currentTarget;
    const  classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr('title');
  }

  sortArr(colName: any): any {
    this.customTitle.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  // Clear
  clear(): any {
    this.titleObj = new Title();
    this.customTitleForm.reset();
    this.submitted = false;
  }
}
