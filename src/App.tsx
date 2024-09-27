import { useState } from 'react'
import './App.css'
import {Button, InputAdornment, TextField} from "@mui/material";
import {TranslationObject} from "./TranslationObject.ts";
import {TitleTranslationDialog} from "./TitleTranslationDialog.tsx";

const AVAILABLE_LOCALES = {
    'zh-HK': { locale: 'zh-HK', title: '', subTitle: '', description: '' },
    'en-GB': { locale: 'en-GB', title: '', subTitle: '', description: '' },
    'ms-MY': { locale: 'ms-MY', title: '', subTitle: '', description: '' },
    'zh-CN': { locale: 'zh-CN', title: '', subTitle: '', description: '' },
};

function App() {
    const [dialogTarget, setDialogTarget] = useState<'title' | 'subTitle'>('title');
    const [titleTranslationDialogOpen, setTitleTranslationDialogOpen] = useState(false);

    const [translations, setTranslations] = useState<{ [key: string]: TranslationObject }>({
        ...AVAILABLE_LOCALES,
    });

    const handleMainChange = (field: 'title' | 'subTitle' | 'description', value: string) => {
        setTranslations((prev) => ({
            ...prev,
            'zh-HK': {
                ...prev['zh-HK'],
                [field]: value,
            },
        }));
    };

    const handleEditTitleDialog = (dialogTarget: 'title' | 'subTitle') => {
        setDialogTarget(dialogTarget);
        setTitleTranslationDialogOpen(true);
    };

    const handleDialogClose = (
        updatedValues: { [key: string]: string },
        dialogTarget: 'title' | 'subTitle' | 'description',
    ) => {
        switch (dialogTarget) {
            case 'title':
                setTitleTranslationDialogOpen(false);
                break;
            case 'subTitle':
                setTitleTranslationDialogOpen(false);
                break;
        }
        setTranslations((prev) => {
            const updatedTranslations = { ...prev };
            Object.keys(updatedValues).forEach((locale) => {
                updatedTranslations[locale] = {
                    ...prev[locale],
                    [dialogTarget]: updatedValues[locale],
                };
            });
            return updatedTranslations;
        });
    };


  return (
      <div>
          <TextField
              label="禮品標題"
              value={translations['zh-HK'].title}
              onChange={(e) => handleMainChange('title', e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          <Button variant="outlined" onClick={() => handleEditTitleDialog('title')}>
                              其他語言
                          </Button>
                      </InputAdornment>
                  ),
              }}
          />
          <TextField
              label="禮品副標題"
              value={translations['zh-HK'].subTitle}
              onChange={(e) => handleMainChange('subTitle', e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          <Button variant="outlined" onClick={() => handleEditTitleDialog('subTitle')}>
                              其他語言
                          </Button>
                      </InputAdornment>
                  ),
              }}
          />
          <Button onClick={() => console.log(translations)}>Log translations</Button>
          <TitleTranslationDialog
              open={titleTranslationDialogOpen}
              onClose={(updatedValues, dialogTarget) => handleDialogClose(updatedValues, dialogTarget)}
              dialogTarget={dialogTarget}
              defaultValue={translations['zh-HK'][dialogTarget]}
              existingTranslations={translations}
          />
      </div>
  )
}

export default App
