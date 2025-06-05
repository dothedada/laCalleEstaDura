import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { getItemFromLS, loadCVsFromLS, saveItemToLS } from './dataStorage.ts';

const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        key: vi.fn((index: number) => {
            const keys = Object.keys(store);
            return keys[index] || null;
        }),
        get length() {
            return Object.keys(store).length;
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

describe('getItemFromLS', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
    });

    it('retrieves existing item from localStorage', () => {
        const testData = { id: 'test1', name: 'Test Item', lang: 'en' };
        mockLocalStorage.setItem('test1', JSON.stringify(testData));

        const result = getItemFromLS('test1');
        expect(result).toEqual(testData);
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test1');
    });

    it('throws error when item does not exist', () => {
        expect(() => getItemFromLS('nonexistent')).toThrow(
            "No element in local storage with id 'nonexistent'",
        );
    });

    it('handles complex element data', () => {
        const complexElement = {
            id: 'complex1',
            lang: 'en',
            name: 'complex-element',
            title: 'Complex Element',
            content: 'Some content',
            items: [{ key: 'field1', value: 'value1' }],
        };
        mockLocalStorage.setItem('complex1', JSON.stringify(complexElement));

        const result = getItemFromLS('complex1');
        expect(result).toEqual(complexElement);
    });
});

describe('loadCVsFromLS', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
    });

    it('returns empty array when no items in localStorage', () => {
        const result = loadCVsFromLS();
        expect(result).toEqual([]);
    });

    it('loads single CV from localStorage', () => {
        const cv = {
            id: 'CV_profile_section_20240315-abc123',
            name: 'My CV',
            tag: 'personal',
            langs: { en: { active: [], hidden: [] } },
            lastUpdate: '2024-03-15',
        };

        mockLocalStorage.setItem('cv1', JSON.stringify(cv));
        mockLocalStorage.key.mockImplementation((index) => {
            if (index === 0) return JSON.stringify(cv);
            return null;
        });

        const result = loadCVsFromLS();
        expect(result).toEqual([cv]);
    });

    it('loads multiple CVs from localStorage', () => {
        const cv1 = {
            id: 'CV_profile_section_20240315-abc123',
            name: 'Personal CV',
            tag: 'personal',
            langs: { en: { active: [], hidden: [] } },
            lastUpdate: '2024-03-15',
        };
        const cv2 = {
            id: 'CV_contact_section_20240316-def456',
            name: 'Work CV',
            tag: 'professional',
            langs: { es: { active: [], hidden: [] } },
            lastUpdate: '2024-03-16',
        };

        mockLocalStorage.setItem('cv1', JSON.stringify(cv1));
        mockLocalStorage.setItem('cv2', JSON.stringify(cv2));
        mockLocalStorage.key.mockImplementation((index) => {
            if (index === 0) return JSON.stringify(cv1);
            if (index === 1) return JSON.stringify(cv2);
            return null;
        });

        const result = loadCVsFromLS();
        expect(result).toEqual([cv1, cv2]);
    });

    it('handles null keys gracefully', () => {
        mockLocalStorage.key.mockReturnValue(null);

        const result = loadCVsFromLS();
        expect(result).toEqual([]);
    });
});

describe('saveItemToLS', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('saves CV element with lastUpdate', () => {
        const cvElement: {
            id: string;
            name: string;
            tag: string;
            lastUpdate?: string;
        } = {
            id: 'CV_profile_section_20240315-abc123',
            name: 'CV Element',
            tag: 'personal',
        };
        saveItemToLS(cvElement);

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'CV_profile_section_20240315-abc123',
            JSON.stringify({
                ...cvElement,
                lastUpdate: new Date().toISOString().slice(0, 10),
            }),
        );
    });

    it('updates existing lastUpdate for CV element', () => {
        const cvElement = {
            id: 'CV_contact_section_20240314-xyz789',
            name: 'Old CV',
        };

        saveItemToLS(cvElement);

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'CV_contact_section_20240314-xyz789',
            JSON.stringify({
                ...cvElement,
                lastUpdate: new Date().toISOString().slice(0, 10),
            }),
        );
    });

    it('saves complex element structure', () => {
        const complexElement = {
            id: 'complex_element_20240315-abc123',
            lang: 'en',
            name: 'complex',
            title: 'Complex Element',
            items: [
                { key: 'field1', value: 'value1' },
                { key: 'field2', value: 'value2' },
            ],
        };

        saveItemToLS(complexElement);

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'complex_element_20240315-abc123',
            JSON.stringify(complexElement),
        );
    });
});
