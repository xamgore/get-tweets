/* eslint-env mocha */

import { equal } from 'assert';
import { last } from 'ramda';
import getTweets from './index';
import tokens from 'twitter-tokens';
import dec from 'bignum-dec';

it('getTweets', done => {
  getTweets(tokens, 'largescalejs_ru', '424119506508980224').then(res => {
    equal(res.length, 36);
    done();
  });
});

it('getTweets including since_id', done => {
  getTweets(tokens, 'largescalejs_ru', dec('424119506508980224')).then(res => {
    equal(res.length, 37);
    equal(last(res).id_str, '424119506508980224');
    equal(last(res).text, last(res).full_text);
    done();
  });
});

it('contains full text', done => {
  getTweets(tokens, 'xamgore', dec('1051799017884188673')).then(res => {
    const twi = last(res);
    equal(twi.text, twi.full_text);
    done();
  });
});
