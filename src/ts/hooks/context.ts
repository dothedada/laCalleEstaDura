import { createContext } from 'react';
import type { Langs } from '../types_app';

export const LangContext = createContext<Langs>('en');
