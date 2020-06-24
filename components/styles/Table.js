import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  /* border-left: 2px solid rgba(0,0,0,0.09);
  border-right: 2px solid rgba(0,0,0,0.09); */
  /* box-shadow: 2px 2px 6px -2px rgba(0,0,0,0.3); */
  text-align: left;
  /* border-spacing: 0 8px; */
  min-width: 100%;
  /* border: 1px solid ${(props) => props.theme.offWhite}; */
  table-layout: auto;
  
    font-size: 1.3rem;
  
  thead {
     font-size: 1.5rem;
    td, th {
       /* background-color: ${(props) => props.theme.primary}; */
       color: ${(props) => props.theme.grey};
      font-weight: 700;
      padding: 0.6rem 2rem 0.6rem 1rem;

      :first-child {
       width: 12rem;
       border-top-left-radius: 4px;
    }

      :last-child {
        width: 12rem;
       border-top-right-radius: 4px;
    }
    }
  }

  tr {
   background-color: #fff;
   border-bottom: 1px solid rgba(0,0,0,0.09);
   &:hover {
      background-color: ${(props) => props.theme.primaryLight};
    }
    &:hover > td {
       background-color: transparent;
    }
  }

  td,
  th {
   
    position: relative;
    padding: 0.6rem 1.6rem 0.6rem 1rem;
    font-weight: 400;
    border-right: none;
    min-width: 12rem;
    &:last-child {
      border-right: none;
      width: 150px;
      position: relative;
      
    }
    label {
      padding: 10px 5px;
      display: block;
    }

    .tooltip {
      position: absolute;
      background-color: black;
      color: #fff;
      top: -30%;
      left: -20%;
      padding: .4rem .8rem;
      border: 1px solid #fff;
      z-index: 10;
      opacity: 0;
      visibility: hidden;
      transition: all .3s;
    }

    &:hover .tooltip {
      visibility: visible;
      opacity: .8;
    }
  
  a {
    color: ${(props) => props.theme.primary};
  }
   
  }

`;

export default Table;
