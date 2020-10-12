import { UIManager } from "react-native";

export function measureNode(node: number, parentNode: number) {
  return new Promise((resolve, reject) => {
    UIManager.measureLayout(
      node,
      parentNode,
      () => {
        reject()
      },
      (x, y, w, h) => {
        resolve({x, y, w, h});
      }
    );
  });
}