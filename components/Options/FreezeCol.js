import React from 'react';
import OptionContext from '../OptionContext';
import BtnGrey from '../styles/BtnGrey';
import BtnPrimary from '../styles/BtnPrimary';
import OptionContainer from '../styles/OptionContainer';
import OptionPopup from '../styles/OptionPopup';
import FormContainer from '../styles/FormContainer';
import { Select } from '../styles/FormComponent';

const FreezeCol = ({ setFreezePass, freezeNo, setFreezeNo }) => {
  return (
    <OptionContext.Consumer>
      {(ctx) => (
        <OptionContainer
          onClick={(e) => {
            e.stopPropagation();
            ctx.setShowFilter(false);
            ctx.setShowSort(false);
            ctx.setShowLimitField(false);
          }}
        >
          <BtnGrey onClick={() => ctx.setShowFreezeCol(!ctx.showFreezeCol)}>
            Freeze Col
          </BtnGrey>
          {ctx.showFreezeCol && (
            <OptionPopup>
              <FormContainer
                style={{ width: '36rem', marginBottom: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setFreezePass(freezeNo);
                  ctx.setShowFreezeCol(false);
                }}
              >
                <label style={{ marginRight: '2rem' }}>
                  Number of freeze col
                </label>
                <Select
                  defaultValue={freezeNo}
                  onChange={(e) => setFreezeNo(parseInt(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Select>

                <BtnPrimary>Submit</BtnPrimary>
              </FormContainer>
            </OptionPopup>
          )}
        </OptionContainer>
      )}
    </OptionContext.Consumer>
  );
};

export default FreezeCol;
