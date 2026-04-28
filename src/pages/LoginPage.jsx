import React from "react";

export default function LoginPage({ onBackHome }) {
  return (
    <main className="login-page">
      <div className="page-glow page-glow-left"></div>
      <div className="page-glow page-glow-right"></div>

      <section className="login-shell container">
        <div className="login-note">
          <p className="eyebrow">welcome back, probably</p>
          <span className="doodle-tag">sign in before the peaches disappear</span>
          <h1>Login / Signup</h1>
          <p className="hero-text">
            This is a soft little entry page for students, flatmates, and people
            ordering oat milk at inconvenient times.
          </p>
          <button className="ghost-button back-home-button" type="button" onClick={onBackHome}>
            ← Back to home
          </button>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <span className="category-icon">🌿</span>
            <div>
              <h2>Come on in</h2>
              <p>tiny account corner</p>
            </div>
          </div>

          <form className="login-form">
            <label>
              <span>Name or email</span>
              <input type="text" placeholder="maybe your campus email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" placeholder="something secret-ish" />
            </label>
            <button className="primary-button login-submit" type="button">
              Login gently
            </button>
          </form>

          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          <button className="auth-button alt-signup-button" type="button">
            Create a new account
          </button>
        </div>
      </section>
    </main>
  );
}
