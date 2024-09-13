import PropTypes from "prop-types";
import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

// Add prop types to DataItem
DataItem.propTypes = {
  icon: PropTypes.element, // The icon should be a valid React element (e.g., an SVG or component)
  label: PropTypes.string.isRequired, // The label is required and must be a string
  children: PropTypes.node, // children can be any renderable elements (text, components, etc.)
};

export default DataItem;
