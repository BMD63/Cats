import React from 'react';
import styled from 'styled-components';
import CatImage from './components/CatImage';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: auto;
  margin: 10px auto;
  padding: 10px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <CatImage />
    </AppContainer>
  );
};

export default App;