import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvService } from '../env.service';
import { TodoService } from './todo.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface FileNode {
  extension: string;
  birthtimeMs: number;
  mode: string;
  name: string;
  size: number;
  type: string;
  path: string;
  children?: FileNode[];
}

const GET_DIRECTORIES = `
                                query ($name: String) {
                                  getFolderDetails(name: $name) {
                                    extension
                                    birthtimeMs
                                    mode
                                    name
                                    size
                                    type
                                    path
                                    children {
                                      type
                                      extension
                                      name
                                      size
                                      path
                                      mode
                                      birthtimeMs
                                      path
                                      children {
                                        extension
                                        birthtimeMs
                                        mode
                                        name
                                        size
                                        type
                                        path
                                        children {
                                          extension
                                          birthtimeMs
                                          mode
                                          name
                                          size
                                          type
                                          path
                                          children {
                                            children {
                                              extension
                                              birthtimeMs
                                              mode
                                              name
                                              size
                                              type
                                              path
                                            }
                                            extension
                                            birthtimeMs
                                            mode
                                            name
                                            size
                                            type
                                            path
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
`;

const TREE_DATA: FileNode[] = [];



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
      this.dataSource.data = response.data.getFolderDetails;;
    });
  };

  showFileFolderInfor = (node: FileNode) => {
    this.data = node;
  }

  ngOnInit() {
    try {
      this.getFolders();
    } catch (error) {
      
    }
   
  }
}
