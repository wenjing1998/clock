class Clock {
  constructor({ size, parentId, ...opts }) {
    console.log('size', size);
    console.log('parentId', parentId);

    this.size = size || 400;
    this.parentId = parentId;
    this.createCanvas = this.createCanvas.bind(this);
  }

  createCanvas() {
    const parentNode = document.getElementById(this.parentId) || document.body;

    console.log('parentNode', parentNode);

    const canvasDom = document.createElement('canvas');

    canvasDom.width = this.size;
    canvasDom.height = this.size;

    const canvas = canvasDom.getContext('2d');
  
    const load = () => {
      // 清除之前的画布，防止出现千手观音
      // canvas.restore();
      // canvas.save();
      // clearRect 的 范围错了...
      canvas.clearRect(-200, -200, this.size, this.size);
      // canvas.save();

      // 画布的位置不变，只是将中心位置调整了？
      canvas.translate(this.size / 2, this.size / 2);
      canvas.rotate(- Math.PI / 2);
      canvas.restore(); //通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。
      canvas.save(); // 通过将当前状态放入栈中，保存 canvas 全部状态的方法。
  
      // 绘制表盘
      // arc(起始X，起始Y，半径，起始角度，结束角度)
      canvas.beginPath();
      canvas.arc(0, 0, 100, 0, 2 * Math.PI);
      canvas.stroke();
      canvas.closePath();
  
      canvas.beginPath();
      canvas.arc(0, 0, 3, 0, 2 * Math.PI);
      canvas.stroke();
      canvas.closePath();

      // 绘制刻度
      canvas.lineWidth = 1;
      for (let i = 0; i < 60; i ++) {
        canvas.rotate(2 * Math.PI / 60);
        canvas.beginPath();
        canvas.moveTo(100, 0);
        canvas.lineTo(95, 0);
        canvas.stroke();
        canvas.closePath();
      }
      canvas.restore();
      canvas.save();
  
      canvas.lineWidth = 3;
      for (let i = 0; i < 12; i ++) {
        canvas.rotate(2 * Math.PI / 12);
        canvas.beginPath();
        canvas.moveTo(100, 0);
        canvas.lineTo(95, 0);
        canvas.stroke();
        canvas.closePath();
      }
      canvas.restore();
      canvas.save();
  
      // 绘制时针 分针 秒针
      const time = new Date();
      const hour = time.getHours();
      const minite = time.getMinutes();
      const second = time.getSeconds();
  
      // 时针
      // 顺时针为 负值，秒针可以忽略不计
      canvas.rotate( 2 * Math.PI / 12 * hour + 2 * Math.PI / 12 * (minite / 60) );
      canvas.beginPath();
      canvas.moveTo(0, 0);
      canvas.lineTo(60, 0);
      canvas.lineWidth = 5;
      canvas.stroke();
      canvas.closePath();
      canvas.restore();
      canvas.save();
  
      // 分针
      canvas.rotate( 2 * Math.PI / 60 * minite + 2 * Math.PI / 60 * (second / 60) );
      canvas.beginPath();
      canvas.moveTo(0, 0);
      canvas.lineTo(70, 0);
      canvas.lineWidth = 3;
      canvas.stroke();
      canvas.closePath();
      canvas.restore();
      canvas.save();
  
      // 秒针
      canvas.rotate(2 * Math.PI / 60 * second);
      canvas.beginPath();
      canvas.moveTo(0, 0);
      canvas.lineTo(80, 0);
      canvas.lineWidth = 1;
      canvas.stroke();
      canvas.closePath();
      canvas.restore();
      canvas.save();
    };

    setInterval(load, 1000);

    parentNode.appendChild(canvasDom);
  }
};

export default Clock;
