import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle `
/* 여긴 app.css입니다. */


@font-face {
    font-family: 'IM_Hyemin-Regular.otf';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Regular.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
}

body {
    font-family: 'IM_Hyemin-Regular.otf';
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
}


#TotalDiv{
    width: 600px;
    height: 900px;
    margin-top: 10px;
    margin-left: 10px;
    background-color: #D5E2F2;
    border: 1px solid gray;
    border-radius: 50px;
    display: inline-block;
    text-align: center;
    
}

#mainIcon{
    width: 250px;
    height: 250px;
    margin-top: 200px;
    margin-bottom: 50px;
}

input{
    font-family: 'IM_Hyemin-Regular.otf';
    font-size: 25px;
    line-height: 1.5;
    font-weight: 400;
    width: 80%;
    height: 50px;
    margin-top: 30px;
    text-align: center;
}

#MainPage.h1{
    color:red;
}`;



export default GlobalStyles;