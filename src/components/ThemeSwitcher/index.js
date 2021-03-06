import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setTheme, toggleTheme } from '../../redux/app/actions';
import { themeSelector } from '../../redux/app/selectors';

import ThemeSwitcher from './ThemeSwitcher';

const mapStateToProps = createStructuredSelector({
  theme: themeSelector
});

const mapDispatchToProps = {
  setTheme,
  toggleTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);
