/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define((require, exports, module) => {
  'use strict';

  const BaseGroupingRule = require('./base');

  function isEmailForcedIntoTreatment (email) {
    return /@softvision\.(com|ro)$/.test(email) ||
           /@mozilla\.(com|org)$/.test(email);
  }

  module.exports = class CadOnSigninGroupingRule extends BaseGroupingRule {
    constructor () {
      super();
      this.name = 'cadOnSignin';
    }

    /**
     * Use `subject` data to decide if the user should see CAD on signin.
     *
     * @param {Object} subject data used to decide
     * @returns {Any}
     */
    choose (subject) {
      if (! this._isValidSubject(subject)) {
        return false;
      }

      if (isEmailForcedIntoTreatment(subject.account.get('email'))) {
        return 'treatment';
      }

      return false;
    }

    /**
     * Is the subject valid?
     *
     * @param {Object} subject
     * @returns {Boolean}
     * @private
     */
    _isValidSubject (subject) {
      return subject &&
             subject.account &&
             subject.account.get('email');
    }
  };
});
