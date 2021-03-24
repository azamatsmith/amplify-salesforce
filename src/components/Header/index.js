import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';

const ReachLink = styled(Link)`
  margin-right: 10px;
`;

const StyledHeader = styled.nav`
  margin-bottom: 20px;
`;

function Header() {
  const links = [
    { name: 'Home', to: '/' },
    { name: 'Todos', to: '/todos' },
  ];
  return (
    <StyledHeader>
      {links.map((link) => (
        <ReachLink key={link.name} to={link.to}>
          {link.name}
        </ReachLink>
      ))}
    </StyledHeader>
  );
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
