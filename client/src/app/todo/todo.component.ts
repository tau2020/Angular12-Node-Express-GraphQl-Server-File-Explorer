import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvService } from '../env.service';
import { TodoService } from './todo.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {GET_DIRECTORIES, FileNode, TREE_DATA} from './graphql-query'

@Component({
  selector: 'tree-nested-overview-example',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {

  treeControl = new NestedTreeControl<FileNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FileNode>();
  public data = {} as FileNode;

  constructor(private todoService: TodoService, private http: HttpClient, private env: EnvService) { }

  hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;


  convertToDec = (mode:any): any =>{
     return parseInt(mode.toString(8), 10)
  }

  niceBytes = (x: string): string => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

  getFolders = (name?: string) => {
    const query = {
      query: GET_DIRECTORIES,
      variables: { name: name },
    };

    return this.http.post(this.env.graphQlApi, query).subscribe((response: any): void => {
      this.dataSource.data = response.data.getFolderDetails;
    });
  };

  showFileFolderInfor = (node: FileNode) => {
    this.data = node;
  }

  ngOnInit() {
    try {
      this.getFolders();
    } catch (error) {
      // #TODO: add error handling
    }
   
  }
}
