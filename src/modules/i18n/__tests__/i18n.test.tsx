import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModuleProvider } from '../../ModuleProvider';
import { moduleRegistry } from '../../registry';
import { i18nModule } from '../index';
import { Welcome } from '../../../components/Welcome';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// Reset modules and initialize i18n before each test
beforeEach(async () => {
  moduleRegistry.unregister('i18n');
  moduleRegistry.register(i18nModule);

  await i18next
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      ns: ['translation'],
      defaultNS: 'translation',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      resources: mockModuleConfig.i18n.resources
    });
});

const mockModuleConfig = {
  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es'],
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to our app',
          login: 'Login',
          signup: 'Sign Up'
        }
      },
      es: {
        translation: {
          welcome: 'Bienvenido a nuestra aplicación',
          login: 'Iniciar sesión',
          signup: 'Registrarse'
        }
      }
    }
  }
};

const renderWithI18n = (ui: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18next}>
      <ModuleProvider modules={mockModuleConfig}>
        {ui}
      </ModuleProvider>
    </I18nextProvider>
  );
};

describe('i18n Module', () => {
  it('should initialize with default language', async () => {
    renderWithI18n(<Welcome />);

    // Check if the welcome text is rendered in English (default)
    expect(await screen.findByText('Welcome to our app')).toBeInTheDocument();
  });

  it('should change language when selected', async () => {
    renderWithI18n(<Welcome />);

    // Wait for the component to render
    await screen.findByText('Welcome to our app');

    // Change language to Spanish
    const languageSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(languageSelect, 'es');

    // Check if the text has changed to Spanish
    expect(await screen.findByText('Bienvenido a nuestra aplicación')).toBeInTheDocument();
    expect(await screen.findByText('Iniciar sesión')).toBeInTheDocument();
    expect(await screen.findByText('Registrarse')).toBeInTheDocument();
  });

  it('should handle missing translations gracefully', async () => {
    const incompleteConfig = {
      i18n: {
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'fr'],
        resources: {
          en: {
            translation: {
              welcome: 'Welcome to our app'
            }
          },
          fr: {
            translation: {} // Empty translations
          }
        }
      }
    };

    render(
      <I18nextProvider i18n={i18next}>
        <ModuleProvider modules={incompleteConfig}>
          <Welcome />
        </ModuleProvider>
      </I18nextProvider>
    );

    // Should show English text as fallback
    expect(await screen.findByText('Welcome to our app')).toBeInTheDocument();
  });
}); 