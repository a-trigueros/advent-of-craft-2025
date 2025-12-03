import { Child } from "./Child";

export interface ISearchChild {
  findByName(name: string): Child | null;
}

export interface IAddChild {
  addChild(child: Child): void;
}

export class ChildrenRepository implements ISearchChild, IAddChild {

  private readonly children: Child[] = [];

  addChild(child: Child): void {
    this.children.push(child);
  }

  findByName(name: string): Child | null {
    return this.children.find(child => child.name === name);
  }
}
