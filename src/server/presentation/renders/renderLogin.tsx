import { AppShell } from '@client/AppShell';
import { renderToString } from 'react-dom/server';
import React from 'react';

export function renderLogin(error?: string) {
    const html = renderToString(<AppShell pageId="login" props={{ error }} />);
    return '<!DOCTYPE html>' + html;
  }