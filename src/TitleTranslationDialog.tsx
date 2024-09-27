import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: (updatedValues: { [key: string]: string }, dialogTarget: 'title' | 'subTitle') => void;
  dialogTarget: 'title' | 'subTitle';
  defaultValue: string;
  existingTranslations: { [key: string]: { title: string; subTitle: string } };
}

const locales = ['en-GB', 'ms-MY', 'zh-CN'];

export const TitleTranslationDialog: React.FC<Props> = ({
  open,
  onClose,
  defaultValue,
  dialogTarget,
  existingTranslations,
}) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({
    'en-GB': false,
    'ms-MY': false,
    'zh-CN': false,
  });

  useEffect(() => {
    if (open) {
      const initialValues: { [key: string]: string } = {};
      const initialChecked: { [key: string]: boolean } = {};
      locales.forEach((locale) => {
        initialValues[locale] = existingTranslations[locale][dialogTarget] || defaultValue;
        initialChecked[locale] = existingTranslations[locale][dialogTarget] !== defaultValue;
      });
      setValues(initialValues);
      setChecked(initialChecked);
    }
  }, [open, existingTranslations, defaultValue]);

  const handleInputChange = (locale: string, value: string) => {
    setValues((prev) => ({ ...prev, [locale]: value }));
  };

  const handleSave = () => {
    const updatedValues = { ...values };
    locales.forEach((locale) => {
      if (!checked[locale]) {
        updatedValues[locale] = defaultValue;
      }
    });
    onClose(updatedValues, dialogTarget);
  };

  return (
    <Dialog open={open} onClose={() => onClose(values, dialogTarget)} maxWidth="xl">
      <DialogTitle>{`輸入禮品標題`}</DialogTitle>
      <DialogContent>
        {locales.map((locale) => (
          <div key={locale}>
            <TextField
              fullWidth
              margin="normal"
              label={`輸入禮品標題（${locale}）`}
              value={values[locale]}
              onChange={(e) => handleInputChange(locale, e.target.value)}
              sx={{ minWidth: '30vw' }}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          保存
        </Button>
        <Button onClick={() => onClose(values, dialogTarget)} color="secondary">
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};
