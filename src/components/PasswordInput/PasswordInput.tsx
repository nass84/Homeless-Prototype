import { type ReactNode, useEffect } from "react";

import '../../styles/core.scss'
import "govuk-frontend/dist/govuk/components/password-input/_password-input.scss";

export interface PasswordInputProps {
  id: string;
  name: string;
  label: string | ReactNode;
  labelAsHeading?: boolean;
  labelSize?: "l" | "m" | "s";
  hint?: string;
  error?: string;
  autocomplete?: "current-password" | "new-password";
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  /** i18n: Text for the show password button */
  showPasswordText?: string;
  /** i18n: Text for the hide password button */
  hidePasswordText?: string;
  /** i18n: Aria label for show password button */
  showPasswordAriaLabelText?: string;
  /** i18n: Aria label for hide password button */
  hidePasswordAriaLabelText?: string;
  /** i18n: Screen reader announcement when password is shown */
  passwordShownAnnouncementText?: string;
  /** i18n: Screen reader announcement when password is hidden */
  passwordHiddenAnnouncementText?: string;
}

export function PasswordInput({
  id,
  name,
  label,
  labelAsHeading = true,
  labelSize = "l",
  hint,
  error,
  autocomplete = "current-password",
  defaultValue,
  onChange,
  className = "",
  showPasswordText = "Show",
  hidePasswordText = "Hide",
  showPasswordAriaLabelText = "Show password",
  hidePasswordAriaLabelText = "Hide password",
  passwordShownAnnouncementText = "Your password is visible",
  passwordHiddenAnnouncementText = "Your password is hidden",
}: PasswordInputProps) {
  const initialise = async () => {
    // Dynamic import to avoid SSR issues
    const { PasswordInput, createAll } = await import("govuk-frontend");
    createAll(PasswordInput);
  };

  useEffect(() => {
    initialise();
  }, []);

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  // Build aria-describedby string
  const ariaDescribedBy =
    [hintId, errorId].filter(Boolean).join(" ") || undefined;

  // Build class names
  const formGroupClass = `govuk-form-group govuk-password-input${
    error ? " govuk-form-group--error" : ""
  }`;
  const labelClass = labelAsHeading
    ? `govuk-label govuk-label--${labelSize}`
    : "govuk-label";
  const inputClass = `govuk-input govuk-password-input__input govuk-js-password-input-input${
    error ? " govuk-input--error" : ""
  }${className ? ` ${className}` : ""}`;

  // Build i18n data attributes for govuk-frontend
  const i18nDataAttributes: Record<string, string> = {};
  if (showPasswordText !== "Show")
    i18nDataAttributes["data-i18n.show-password"] = showPasswordText;
  if (hidePasswordText !== "Hide")
    i18nDataAttributes["data-i18n.hide-password"] = hidePasswordText;
  if (showPasswordAriaLabelText !== "Show password")
    i18nDataAttributes["data-i18n.show-password-aria-label"] =
      showPasswordAriaLabelText;
  if (hidePasswordAriaLabelText !== "Hide password")
    i18nDataAttributes["data-i18n.hide-password-aria-label"] =
      hidePasswordAriaLabelText;
  if (passwordShownAnnouncementText !== "Your password is visible")
    i18nDataAttributes["data-i18n.password-shown-announcement"] =
      passwordShownAnnouncementText;
  if (passwordHiddenAnnouncementText !== "Your password is hidden")
    i18nDataAttributes["data-i18n.password-hidden-announcement"] =
      passwordHiddenAnnouncementText;

  // Render label
  const labelElement = labelAsHeading ? (
    <h1 className="govuk-label-wrapper">
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
    </h1>
  ) : (
    <label className={labelClass} htmlFor={id}>
      {label}
    </label>
  );

  return (
    <div
      className={formGroupClass}
      data-module="govuk-password-input"
      {...i18nDataAttributes}
    >
      {labelElement}

      {hint && (
        <div id={hintId} className="govuk-hint">
          {hint}
        </div>
      )}

      {error && (
        <p id={errorId} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}

      <div className="govuk-input__wrapper govuk-password-input__wrapper">
        <input
          className={inputClass}
          id={id}
          name={name}
          type="password"
          spellCheck={false}
          autoComplete={autocomplete}
          autoCapitalize="none"
          defaultValue={defaultValue}
          aria-describedby={ariaDescribedBy}
          onChange={onChange}
        />
        <button
          type="button"
          className="govuk-button govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle"
          data-module="govuk-button"
          aria-controls={id}
          aria-label={showPasswordAriaLabelText}
          hidden
        >
          {showPasswordText}
        </button>
      </div>
    </div>
  );
}
