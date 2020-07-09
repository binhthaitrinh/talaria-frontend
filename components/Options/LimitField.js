import React from 'react';
import OptionContext from '../OptionContext';
import OptionContainer from '../styles/OptionContainer';
import BtnGrey from '../styles/BtnGrey';
import OptionPopup from '../styles/OptionPopup';
import LimitFieldForm from '../styles/LimitFieldForm';
import FilterAction from '../styles/FilterAction';
import BtnPrimary from '../styles/BtnPrimary';
import _ from 'lodash';

const LimitField = ({
  fieldArr,
  fieldSelected,
  setFieldSelected,
  populate,
  initialFields,
  setFieldLimit,
}) => {
  return (
    <OptionContext.Consumer>
      {(ctx) => (
        <OptionContainer
          onClick={(e) => {
            e.stopPropagation();
            ctx.setShowFilter(false);
            ctx.setShowFreezeCol(false);
            ctx.setShowSort(false);
          }}
        >
          <BtnGrey onClick={() => ctx.setShowLimitField(!ctx.showLimitField)}>
            Limit fields <ion-icon name="remove-circle-outline"></ion-icon>
          </BtnGrey>
          {ctx.showLimitField && (
            <OptionPopup>
              <LimitFieldForm>
                <div>
                  {fieldArr.map((field) => (
                    <div key={field}>
                      <input
                        type="checkbox"
                        checked={fieldSelected[field]}
                        onChange={() =>
                          setFieldSelected((fieldSelected) => ({
                            ...fieldSelected,
                            [field]: !fieldSelected[field],
                          }))
                        }
                        id={field}
                      />
                      <label htmlFor={field}>{_.startCase(field)}</label>
                    </div>
                  ))}
                </div>
                <FilterAction>
                  <BtnPrimary
                    onClick={(e) => {
                      e.preventDefault();
                      populate();
                      ctx.setShowLimitField(false);
                    }}
                  >
                    Limit
                  </BtnPrimary>
                  <BtnGrey
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldLimit(fieldArr);
                      setTimeout(() => {
                        ctx.setShowLimitField(false);
                      }, 500);
                    }}
                  >
                    Select All
                  </BtnGrey>
                  <BtnGrey
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldLimit(initialFields);
                      setTimeout(() => {
                        ctx.setShowLimitField(false);
                      }, 500);
                    }}
                  >
                    Reset to default
                  </BtnGrey>
                </FilterAction>
              </LimitFieldForm>
            </OptionPopup>
          )}
        </OptionContainer>
      )}
    </OptionContext.Consumer>
  );
};

export default LimitField;
