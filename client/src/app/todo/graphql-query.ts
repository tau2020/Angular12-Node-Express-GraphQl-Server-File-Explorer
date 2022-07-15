export const TREE_DATA: FileNode[] = [];
export interface FileNode {
  extension: string;
  birthtimeMs: number;
  mode: string;
  name: string;
  size: number;
  type: string;
  path: string;
  children?: FileNode[];
}

export const GET_DIRECTORIES = `
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
