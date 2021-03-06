let strings = new Vue({
  el:'#app',
  data: {
    string1:'',
    string2:'',
    string3:'',
    string4:'',
    string5:'',
    string6:'',
    keys:['0','0','0','0','0','0']
  },
  methods: {
    //配列に値をセットする
    setString1Key: function(){
      this.$set(this.keys,5,this.string1)
    },
    setString2Key: function(){
      this.$set(this.keys,4,this.string2)
    },
    setString3Key: function(){
      this.$set(this.keys,3,this.string3)
    },
    setString4Key: function(){
      this.$set(this.keys,2,this.string4)
    },
    setString5Key: function(){
      this.$set(this.keys,1,this.string5)
    },
    setString6Key: function(){
      this.$set(this.keys,0,this.string6)
    },
    //セットされた値から0を取り除き、新しい配列を作る
    createNewArray: function(){
      let currentArray = this.keys
      let removals = ['0']


       let removed0Array = currentArray.filter(function(v){
        return ! removals.includes(v)
      })

      let newArray = [...new Set(removed0Array)]

      //CM7(9)の場合→入力された値[1,5,12,2]
      let root = newArray[0] //1
      let mid = newArray[1]  //5
      let top = newArray[2]  //12
      if(top - mid >= 6){
        if(root < 5){
        newArray.push(String(+root + 7)) //配列に8が追加(5度が入る)
      }else{
        newArray.push(String(+root - 5))
      }
      }
      return newArray  //[1,5,8,12,2] CM7(9)
    },
    //newArrayから組み合わせを作成する
    createCombination: function(){
      let array1 = this.createNewArray()
      let arrayInit = []
      let i, j, k,l,m,array2,array3,array4,array5

      //階乗して組み合わせを作成
      /*配列の要素が4つ、5つのバージョンも作る
      lengthが2つの場合はそこで処理を抜ける等やる
      あと、配列のループを行い入れ子構造を解除*/
      for(i = 0;i < array1.length; i++){
      array2 = array1.slice(0)
      array2.splice(i, 1)
      for(j = 0; j < array2.length; j++) {
        array3 = array2.slice(0)
        array3.splice(j, 1)
        for(k = 0;k < array3.length; k++){
          arrayInit.push([array1[i]].concat([array2[j]]).concat([array3[k]]))
          array4 = array3.slice(0)
          array4.splice(k,1)
          for(l = 0;l < array4.length; l++){
            arrayInit.push([array1[i]].concat([array2[j]]).concat([array3[k]]).concat([array4[l]]))
            array5 = array4.slice(0)
            array5.splice(l,1)
            for(m = 0;m < array5.length; m++){
              arrayInit.push([array1[i]].concat([array2[j]]).concat([array3[k]]).concat([array4[l]]).concat([array5[m]]))

            }
          }
        }
      }
      }
      console.log(arrayInit)
      return arrayInit
    },
  /*  const combination = (nums, k) => {
let ans = [];
if (nums.length < k) {
    return []
}
if (k === 1) {
    for (let i = 0; i < nums.length; i++) {
        ans[i] = [nums[i]];
    }
} else {
    for (let i = 0; i < nums.length - k + 1; i++) {
        let row = combination(nums.slice(i + 1), k - 1);
        for (let j = 0; j < row.length; j++) {
            ans.push([nums[i]].concat(row[j]));
        }
    }
}
return ans;
},*/


    codeMaker: function(){
      let length = this.createNewArray().length
      let codenames = []
      let keys = this.createCombination()
      let undefine = 'undefined'

      if(length == 6){
        keys.forEach((key) => {
          codename = this.sixCode(key)
          if(codename != undefined){
          codenames += codename}
        })

        return codenames
      }
      else if(length == 5){
        keys.forEach((key) => {
          codename = this.fiveCode(key)
          if(codename != undefined){
          codenames += codename}
        })

        return codenames
      }
      else if(length == 4){
        keys.forEach((key) => {
          codename = this.fourCode(key)
          if(codename != undefined){
          codenames += codename}
        })

        return codenames
      }
      else if(length == 3){
        keys.forEach((key) => {
          codename = this.threeCode(key)
          if(codename != undefined){
          codenames += codename}
        })

        return codenames
      }
    },
    keyNameMacthing: function(root){
      if(root == 1){
        return 'C'
      }else if(root == 2){
        return 'C#'
      }else if(root == 3){
        return 'D'
      }else if(root == 4){
        return 'D#'
      }else if(root == 5){
        return 'E'
      }else if(root == 6){
        return 'F'
      }else if(root == 7){
        return 'F#'
      }else if(root == 8){
        return 'G'
      }else if(root == 9){
        return 'G#'
      }else if(root == 10){
        return 'A'
      }else if(root == 11){
        return 'A#'
      }else if(root == 12){
        return 'B'
      }
    },

    fiveCode: function(key){

      let root = key[0]
      let top = key[2]
      let add = key[4]

      let root_codename = this.fourCode(key.splice(0,4))

      if(root_codename != undefined){
        if(add - top == 6 || add - top == -6){
          return root_codename + '(♭9)'
        }else if(add - top == 7 || add - top == -5){
          return root_codename + '(9)'
        }
     }
    },

    threeCode: function(key){
      let root = key[0]
      let mid = key[1]
      let top = key[2]


      if(mid - root == -8 && top - mid == 3 || mid - root == 4 && top - mid == -9
      || mid - root == -8 && top - mid == -9 || mid - root == 4 && top - mid == 3){
        let codename = this.keyNameMacthing(root)

        return codename

      }else if(mid - root == -9 && top - mid == 4 || mid -root == 3 && top - mid == 4
      || mid - root == -9 && top - mid == -8 || mid -root == 3 && top - mid == -8){
        let codename = this.keyNameMacthing(root)
        return codename + 'm'
      }
  },

    fourCode: function(key){

      let root = key[0]
      let mid = key[1]
      let top = key[2]
      let add = key[3]

      let root_codename = this.threeCode(key.slice(0,3))

      if(root_codename != undefined){

        let tention = add - top

        if(tention == 4 || tention == -8){
          /*if(root_codename[-3:] == 'dim'){
            return keyNameMacthing(root) + 'm7♭5'
          }*/
         return root_codename + 'M7'
        }
        else if(tention == 3 || tention == -9){
          return root_codename + '7'
        }
    }
  },

    sixCode: function(){

      let root = key[0]
      let top = key[2]
      let add = key[5]

      let root_codename = this.fiveCode(key.slice(0,5))

      if(root_codename != undefined){

        if(add - top == 6){
          return root_codename + '(♭9)'
        }
        if (add - top == -10) {
          return root_codename + '(9)'
        }
      }
    },
  }
})
/*
  let strings = document.getElementById("strings");

  let string1List = strings.string1;

  let string1 = string1List.value;

  console.log(string1);
  */
