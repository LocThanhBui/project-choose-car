import React, { Component } from "react";
import dataCar from "../Data/arrayFeatures.json";
import dataWheel from "../Data/wheels.json";

export default class ChonXe extends Component {
  state = {
    carCurrent: {
      id: 1,
      title: "Crystal Black",
      type: "Pearl",
      img: "./images/icons/icon-black.jpg",
      srcImg: "images-black/images-black-1/",
      color: "Black",
      price: "19,550",
      engineType: "In-Line 4-Cylinder",
      displacement: "1996 cc",
      horsepower: "158 @ 6500 rpm",
      torque: "138 lb-ft @ 4200 rpm",
      redline: "6700 rpm",
      wheels: [
        {
          idWheel: 1,
          srcImg: "images-black/images-black-1/",
        },
        {
          idWheel: 2,
          srcImg: "images-black/images-black-2/",
        },
        {
          idWheel: 3,
          srcImg: "images-black/images-black-3/",
        },
      ],
    },
  };

  changeColor = (newColor) =>{
    this.setState({
      carCurrent: newColor,
    })
  }

  renderColor = () => {
    return dataCar.map((item, index) => {
      return (
        <div
        
          key={index}
          className="row border border-link p-2"
          style={{ cursor: "pointer" }}
        >
          <img
            onClick={() => {this.changeColor(item)}}
            className="col-2"
            style={{ width: "100%" }}
            src={item.img}
            alt={item.title}
          />
          <div className="col-10">
            <span className="card-title font-weight-bold">{item.title}</span>
            <p className="card-text">{item.type}</p>
          </div>
        </div>
      );
    });
  };


  changeWheel = (itemWheel) => {
    let objWheel = this.state.carCurrent.wheels.find(item => item.idWheel === itemWheel.idWheel);
    if(objWheel !== -1) {
      this.setState({
        carCurrent: {...this.state.carCurrent,srcImg: objWheel.srcImg}
      })
      
    }
  }

  renderWheels = () => {
    return dataWheel.map((item, index) => {
      return (
        <div
          onClick={() =>{this.changeWheel(item)
          
          }}
          className="row border border-link p-2"
          style={{ cursor: "pointer" }}
          key={index}
        >
          <img
            className="col-2"
            style={{ width: "100%" }}
            src={item.img}
            alt={index}
          />
          <div className="col-10 d-flex flex-column align-items-start justify-content-center">
            <span className="card-title font-weight-bold ">{item.title}</span>
          </div>
        </div>
      );
    });
  };

  componentDidMount = () =>{
     // Đây là phương thức có sẵn của component và tự động thực thi sau khi hàm render được gọi
    // Lưu ý: componentDidMount phương thức này chỉ chạy một lần đầu tiên sau khi hàm render được gọi
    let tagScript = document.createElement('script');
    tagScript.src = "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/3.0.3/js-cloudimage-360-view.min.js";

    // DOM tới script appendScript
    document.querySelector('#appendScript').appendChild(tagScript);
  }
  componentDidUpdate = () =>{
  // Hàm này chạy sau khi state thay đổi, tự kích hoạt sau render
    // Lưu ý: Không được setState tại component này, tại vì khi componentDidUpdate -> setState -> gọi render -> render gọi componentDidUpdate -> componentDidUpdate lại tiếp tục setState -> tạo ra vòng lặp vô tận

    //clean ảnh cũ
    document.querySelector('#carCurrent').innerHTML = "";

    let tagScript = document.createElement('script');
    tagScript.src = "https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.lazysizes.min.js";

    // DOM tới script appendScript
    document.querySelector('#appendScript').innerHTML = "";
    document.querySelector('#appendScript').appendChild(tagScript);


  }

  render() {
    return (
      <div>
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                {/* <img
                  style={{ width: "100%", paddingTop: "10px" }}
                  // src="./images/images-black/images-black-1/civic-1.jpg"
                  alt="civic"
                /> */}

                <div
                  id="carCurrent"
                  className="cloudimage-360"
                  data-folder={"./images/"+this.state.carCurrent.srcImg}
                  data-filename="civic-{index}.jpg"
                  data-amount="8"
                ></div>
                <div id="appendScript"></div>
                <h4>Extorior Color</h4>
                {/* {this.renderExtorior()} */}
                <table className="table table-bordered">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Color</td>
                      <td>{this.state.carCurrent.color}</td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>{this.state.carCurrent.price}</td>
                    </tr>
                    <tr>
                      <td>Engine Type</td>
                      <td>{this.state.carCurrent.engineType}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6">
                <div
                  className="card bg-light"
                  style={{ width: "100%", paddingTop: "10px" }}
                >
                  <div className="card-header">
                    <span className="text-dark font-weight-bold">
                      Chọn màu xe
                    </span>
                  </div>
                  <div className="card-body bg-light ">
                    {this.renderColor()}
                  </div>
                </div>
                <div
                  className="card bg-light mt-2"
                  style={{ width: "100%", paddingTop: "10px" }}
                >
                  <div className="card-header">
                    <span className="text-dark font-weight-bold">
                      Chọn phụ kiện
                    </span>
                  </div>
                  <div className="card-body bg-light ">
                    {this.renderWheels()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
