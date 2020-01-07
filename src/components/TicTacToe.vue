<template>
  <div>
    <h1>Tic Tac Toe</h1>
    <table id="table">
      <tr v-for="(row, rowsIndex) in states">
        <td v-for="(state, colsIndex) in row" @click="onSelect(rowsIndex, colsIndex)">
          <div style="color:blue;" v-if="state === 1">🔵</div>
          <div style="color:red;" v-if="state === -1">🔴</div>
        </td>
      </tr>
    </table>
    <div style="text-align:center;">
      <div style="color:blue;" v-if="playerId === 1">「🔵プレイヤーさん、マスを選んでください」</div>
      <div style="color:red;" v-if="playerId === -1">「🔴プレイヤーさん、マスを選んでください」</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "TicTacToe",
    data() {
      const length = this.property.magnification * 3;
      let states = new Array(length);
      this.initStates(states, length);

      return {
        length: length,
        states: states,
        playerId: 1,
        winnerId: 0,
        toastedOptions: {
          duration: 1000,
          position: "top-center",
          className: toasted
        }
      }
    },
    methods: {
      initStates(states) {
        for (let i = 0; i < states.length; i++) {
          const row = new Array(states.length).fill(0);
          states.splice(i, 1, row);
        }
      },
      onSelect(rowsIndex, colsIndex) {
        let state = this.states[rowsIndex][colsIndex];

        if(state !== 0) {
          this.$toasted.error('このマスは既に選択されています!', this.toastedOptions);
          return
        }

        // 選択されたマスを現在のプレイヤーIDに置換する。Vue.jsにリアクティブさせる為にspliceを使用する。
        const row = this.states[rowsIndex];
        row[colsIndex] = this.playerId;
        this.states.splice(rowsIndex, 1, row);
        this.playerId *= -1;

        const winnerId = this.getWinnerId();
        if (winnerId !== 0) {
          this.initStates(this.states, this.length);
          let playerIds = {
            1: '🔵',
            '-1': '🔴'
          };
          this.$toasted.success(`${playerIds[winnerId]}さんの勝ちです。おめでとうございます！`, this.toastedOptions);
        } else if (this.isDraw()) {
          this.initStates(this.states, this.length);
          this.$toasted.success('引き分けです！', this.toastedOptions);
        }
      },
      getWinnerId() {
        for(let i = 0; i < this.length; i++){
          // 横の判定
          const row = this.states[i];
          if(this.isLineFilled(row)) {
            return row[0];
          }

          // 縦の判定
          const col = new Array(this.length);
          for(let j = 0; j < this.length; j++) {
            col[j] = this.states[j][i];
          }
          if(this.isLineFilled(col)) {
            return col[0];
          }
        }

        // 斜めの判定1
        const skew1 = new Array(this.length);
        for(let i = 0; i < this.length; i++) {
          skew1[i] = this.states[i][i];
        }
        if(this.isLineFilled(skew1)) {
          return skew1[0];
        }

        // 斜めの判定2
        console.log(this.states);
        const skew2 = new Array(this.length);
        for(let i = 0; i < this.length; i++) {
          skew2[i] = this.states[i][this.length - i - 1]
        }
        // console.log(`skew2: ${skew2}`);
        if(this.isLineFilled(skew2)) {
          return skew2[0];
        }

        // 勝敗が決定していない
        return 0;
      },
      isLineFilled(line) {
        // ライン要素に1つでもPlayerId=0(デフォルト値）があれば勝敗は決まっていない
        for (const i of line) {
          if (i === 0) {
            return false;
          }
        }
        // ライン要素が全て同じPlayerIdなら勝敗が決まっている
        if (line[0] === line[1] && line[1] === line[2]) {
          return true;
        }
      },
      isDraw() {
        for (let i = 0; i < this.length; i++) {
          for (let j = 0; j < this.length; j++) {
            const state = this.states[i][j];
            // デフォルト値が存在するので勝敗は決していない
            if (state === 0) {
              return false
            }
          }
        }
        // デフォルト値が存在しないので、引き分け
        return true
      },
    },
    props: {
      property: {
        magnification: {
          type: Number,
          default: 1
        }
      }
    }
  }
</script>

<style scoped>
  #table {
    margin: 0 auto;
    border-collapse: collapse;
    border: 3px solid #ccc;
  }

  #table td {
    border: 1px solid #ccc;
    height: 100px;
    width: 100px;
    text-align: center;
    vertical-align: middle;
    font-size: 50px;
    cursor: pointer;
  }

  h1 {
    text-shadow: 2px 2px 2px gray;
  }
  
  .toasted {
    font-family: "Noto Mono",serif;
  }
</style>
