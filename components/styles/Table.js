import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  /* border-left: 2px solid rgba(0,0,0,0.09);
  border-right: 2px solid rgba(0,0,0,0.09); */
  /* box-shadow: 2px 2px 6px -2px rgba(0,0,0,0.3); */
  text-align: left;
  /* border-spacing: 0 8px; */
  width: 100%;
  /* border: 1px solid ${(props) => props.theme.offWhite}; */
  table-layout: fixed;
  
    font-size: 1.3rem;
  
  thead {
     font-size: 1.5rem;
    td, th {
       /* background-color: ${(props) => props.theme.primary}; */
       color: ${(props) => props.theme.grey};
      font-weight: 700;

      :first-child {
       width: 12rem;
       border-top-left-radius: 4px;
    }

      :last-child {
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
   
    /* position: relative; */
    padding: 0.6rem 0 0.6rem 1.6rem;
    font-weight: 400;
    border-right: none;
    &:last-child {
      border-right: none;
      width: 150px;
      position: relative;
      
    }
    label {
      padding: 10px 5px;
      display: block;
    }

    
   
  }

`;

export default Table;
