import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  box-shadow: 0px 2px 12px -2px rgba(0,0,0,0.3);
  text-align: left;
  /* border-spacing: 0 8px; */
  width: 100%;
  /* border: 1px solid ${(props) => props.theme.offWhite}; */
  table-layout: fixed;
  
    font-size: 1.3rem;
  
  thead {
     font-size: 1.5rem;
    td, th {
       background-color: ${(props) => props.theme.primary};
       color: #fff;
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
    padding: 1.2rem 0 1.2rem 1.2rem;
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
