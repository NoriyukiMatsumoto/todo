# 概要
フロントサイドのテストに関して調査

# 参照
- サンプルコード
  - 参考：[Create React App TypeScript Todo Example 2020](https://github.com/laststance/create-react-app-typescript-todo-example-2020)
- テストについて
  - 参考：[フロントエンドのテストについて考える](https://qiita.com/okmttdhr/items/c1e80353928e121c4761)

# テストレベル
## ユニットテスト
小さなプログラムを「単体」でテストする手法をいわゆるユニットテストと呼びます。パッケージや少し大きなモジュール単位で実行するものを「コンポーネントテスト」と呼んだりもしますが、大差はないと考えて良いでしょう。

ユニットテストは、基本的には100%に近いカバレッジで実装されることが望ましいです。最も実装/実行コストが少ないですし、書けばとりあえずメリットを出しやすいのがこのテストです。

注意点としては、できる限り小さくテストすること、高速に実行できることを守るという点です。これを守ることでエラーの特定時間を短縮しやすくなります。(ひとつのテストの実行時間は1/10秒以下であるべき、としている書籍もあります)。

フロントエンドでは、JestやMochaでロジックをテストするようなケースがユニットテストに当たります。これは、コンポーネントの振る舞いをテストするものや、Jestのsnapshotテストのようなものも含まれると考えます。

## 結合テスト
いくつかのクラスや関数を組み合わせ、意味のある塊をテストする手法です。

このとき、使用するクラスのロジックについては気にしないことがポイントです。例えば、「FacadeパターンやProxyパターンの実装の入出力だけをテストしたい」などが対象として思い浮かびます。「プライベートメソッドをテストしない」理由と少し似ていますね。

あるいは、フロントエンドでは、UIも含めたコンポーネントとして、ブラウザを使ってテストするケースも多いでしょう。

## システムテスト
すべての要素(例えばバックエンドとの通信・ハードウェアなども)をつなぎ合わせてテストすることをいいます。(結合テストやE2Eテストということもありますが、この記事では区別するためにこう呼ぶことにします)。

いわゆるE2Eテストをフロントエンドで実装する際も、それが結合テストなのかシステムテストなのかはしっかり区別する必要がありそうです。

# 目的別テスト
## リグレッションテスト
動作を担保するために実装するテストです。複雑なロジックがないコードでも、仕様を担保し、予期せぬ変更がないことを保証するために実装します。

## UIテスト
見た目に関するテストです。

フロントエンドでわかりやすいものだと、Visual Regression Testなどがあげられます。UIの予期せぬ変更を検知するのが目的で、名前の通りUIに関するリグレッションテストと位置づけることができます。

また、StorybookなどによるUIドキュメントも、Addonを駆使すれば、ある種のUIテストといえるでしょう。ただし、Storybookをユニットテスト代わりに考えるのは危険だと考えます。ある程度複雑な振る舞いをテストする際には、別途ユニットテストを実装する方が好ましいです。

# テスト技法
## ホワイトボックステスト / ブラックボックステスト
ホワイトボックステストとは、機能のロジックや入出力をベースにテストする手法です。

私達が普段書いているユニットテストは、ホワイトボックステストに含まれることが多いです。例えば、クラスのメソッドの振る舞いや、関数の返り値をテストする、などです。網羅性などを意識するのも多くはホワイトボックステストになるでしょう。

逆にブラックボックステストとは、機能の実際の振る舞いをベースにテストする手法です。内部的なロジックを気にせずに振る舞いのみに焦点を当ててテストをします。

テスト種別でいうと、システムテストはブラックボックテストを行うことが多いです。内部ロジックについてはユニットテストで保証されている前提で、実際の振る舞いを大きくテストするためです。

また、結合テストも、複数のロジックをつなぎこんだ際の振る舞いをテストするという見方もできるので、ブラックボックステストをしているともいえると考えます。そして同時に、結合観点のロジックに関してはホワイトボックステストしているとも捉えることができます。

この2つの考え方は「何をテストするべきか」「関数の責務がどこにあるか」ということを検討するときに有効です。

# 具体例
## ユニットテスト


## 結合テスト


### `yarn test`
[Jest](https://jestjs.io/) is all-in-one test-runner built in [Create React App](https://facebook.github.io/create-react-app/) and covers function-level unit testing to component-behavior-level integration testing.
The Repo use to [react-testing-library](https://github.com/testing-library/react-testing-library) for component integration testing.

## システムテスト / リグレッションテスト
`cypress`で実行されるE2Eテストは、バックエンドとの通信も含まれるため、システムテストといえる。
また動作を担保しているため、リグレッションテストといえる。

### `yarn cypress`
[Cypress](https://www.cypress.io/) is all-in-one E2E Testing tool which can deal testing on real browser.  
This command using [Electron](https://www.electronjs.org/) by Cypress default.

`yarn cypress:open` require `yarn start` before.

```bash
yarn start # Launch DevServer
yarn cypress:open
```

![cypress_open](images/cypress_open.gif)

### `yarn cypress`
Run Cypress with headless [Electron](https://www.electronjs.org/).  
That mean this command complete all on a terminal without GUI.

```bash
yarn start # Launch DevServer
yarn cypress:run
```

## UIテスト