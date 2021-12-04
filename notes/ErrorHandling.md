# Error Handling

개발할 때 개발 단계에서 실수를 할 수 있다. 
만약 throw Error만 하게되면 실시간으로 Error가 나오기 때문에 `컴파일 단계에서 실수를 잡는 것이 더 좋다`. 

```js
function move(dir: 'up' | 'down' | 'go') {
  switch(dir) {
    case 'up':
      position.y += 1
      break;
    case 'down':
      position.y -= 1
      break;
    default:
      //invalid라는 변수가 never 타입이고 dir을 할당했다.
      const invalid: never = dir; //go가 선언되었는데 사용되고 있지 않다는 에러가 컴파일때 일어난다.
      throw new Error(`unknown direction ${dir}`)
  }
}
```

> try, catch, finally 중, finally는 에러가 발생하든 발생하지 않든 마무리 단계에 실행해야하는 것이 있으면 사용한다.