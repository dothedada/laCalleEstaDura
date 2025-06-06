import { createContext } from 'react';
import type { Langs } from '../types';

export const LangContext = createContext<Langs>('en');
