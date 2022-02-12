# React-Admin-simple-example
<div class="col s12 m8 offset-m1 xl7 offset-xl1 markdown-section DocSearch-content toc-content">
            <h1 id="react-admin-tutorial">React-Admin Tutorial</h1>
<p>This 30 minutes tutorial will expose how to create a new admin app based on an existing REST API.</p>
<a href='https://marmelab.com/react-admin/Tutorial.html#setting-up/'>React-Admin Tutorial<a>
<h2 id="setting-up">Setting Up</h2>

<p>React-admin uses React. We’ll use <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a> to create an empty React app, and install the <code class=" highlighter-rouge language-plaintext">react-admin</code> package:</p>

<div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight language-sh"><code class=" language-sh">yarn create react-app test-admin
cd test-admin/
yarn add react-admin ra-data-json-server prop-types
yarn start
</code></pre></div></div>

<p>You should be up and running with an empty React application on port 3000.</p>

<h2 id="using-an-api-as-data-source">Using an API As Data Source</h2>

<p>React-admin runs in the browser, and relies on data it fetches from APIs.</p>

<p>We’ll be using <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a>, a fake REST API designed for testing and prototyping, as the datasource for the application. Here is what it looks like:</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight language-plaintext"><code class=" language-plaintext">curl https://jsonplaceholder.typicode.com/users/2
</code></pre></div></div>

<div class="language-json highlighter-rouge"><div class="highlight"><pre class="highlight language-json"><code class=" language-json">{
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
}
</code></pre></div></div>

<p>JSONPlaceholder provides endpoints for users, posts, and comments. The admin we’ll build should allow to Create, Retrieve, Update, and Delete (CRUD) these resources.</p>

<h2 id="making-contact-with-the-api-using-a-data-provider">Making Contact With The API Using a Data Provider</h2>

<p>Bootstrap the admin app by replacing the <code class=" highlighter-rouge language-plaintext">src/App.js</code> by the following code:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/App.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Admin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> jsonServerProvider <span class="token keyword">from</span> <span class="token string">'ra-data-json-server'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> dataProvider <span class="token operator">=</span> <span class="token function">jsonServerProvider</span><span class="token punctuation">(</span><span class="token string">'https://jsonplaceholder.typicode.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Admin</span> <span class="token attr-name">dataProvider</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>dataProvider<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre></div></div>

<p>That’s enough for react-admin to render an empty app and confirm that the setup is done:</p>

<p><a href="./img/tutorial_empty.png"><img src="/react-admin/img/tutorial_empty.png" alt="Empty Admin"></a></p>

<p>The <code class=" highlighter-rouge language-plaintext">App</code> component renders an <code class=" highlighter-rouge language-plaintext">&lt;Admin&gt;</code> component, which is the root component of a react-admin application. This component expects a <code class=" highlighter-rouge language-plaintext">dataProvider</code> prop - a function capable of fetching data from an API. Since there is no standard for data exchanges between computers, you will probably have to write a custom provider to connect react-admin to your own APIs - but we’ll dive into Data Providers later. For now, let’s take advantage of the <code class=" highlighter-rouge language-plaintext">ra-data-json-server</code> data provider, which speaks the same REST dialect as JSONPlaceholder.</p>

<p>Now it’s time to add features!</p>

<h2 id="mapping-api-endpoints-with-resources">Mapping API Endpoints With Resources</h2>

<p>We’ll start by adding a list of users.</p>

<p>The <code class=" highlighter-rouge language-plaintext">&lt;Admin&gt;</code> component expects one or more <code class=" highlighter-rouge language-plaintext">&lt;Resource&gt;</code> child components. Each resource maps a name to an endpoint in the API. Edit the <code class=" highlighter-rouge language-plaintext">App.js</code> file to add a resource named <code class=" highlighter-rouge language-plaintext">users</code>:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/App.js
import * as React from "react";
<span class="token deleted">-import { Admin } from 'react-admin';</span>
<span class="token inserted">+import { Admin, Resource, ListGuesser } from 'react-admin';</span>
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
<span class="token deleted">-const App = () =&gt; &lt;Admin dataProvider={dataProvider} /&gt;;</span>
<span class="token inserted">+const App = () =&gt; (</span>
<span class="token inserted">+    &lt;Admin dataProvider={dataProvider}&gt;</span>
<span class="token inserted">+        &lt;Resource name="users" list={ListGuesser} /&gt;</span>
<span class="token inserted">+    &lt;/Admin&gt;</span>
<span class="token inserted">+);</span>

export default App;
</code></pre></div></div>

<p>The line <code class=" highlighter-rouge language-plaintext">&lt;Resource name="users" /&gt;</code> informs react-admin to fetch the “users” records from the <a href="https://jsonplaceholder.typicode.com/users">https://jsonplaceholder.typicode.com/users</a> URL. <code class=" highlighter-rouge language-plaintext">&lt;Resource&gt;</code> also defines the React components to use for each CRUD operation (<code class=" highlighter-rouge language-plaintext">list</code>, <code class=" highlighter-rouge language-plaintext">create</code>, <code class=" highlighter-rouge language-plaintext">edit</code>, and <code class=" highlighter-rouge language-plaintext">show</code>).</p>

<p>The <code class=" highlighter-rouge language-plaintext">list={ListGuesser}</code> prop means that react-admin should use the <code class=" highlighter-rouge language-plaintext">&lt;ListGuesser&gt;</code> component to display the list of posts. This component <em>guesses</em> the format to use for the columns of the list based on the data fetched from the API.</p>

<p>The app can now display a list of users:</p>

<p><a href="./img/tutorial_users_list.png"><img src="/react-admin/img/tutorial_users_list.png" alt="Users List"></a></p>

<p>If you look at the network tab in the browser developer tools, you’ll notice that the application fetched the <code class=" highlighter-rouge language-plaintext">https://jsonplaceholder.typicode.com/users</code> URL, then used the results to build the Datagrid. That’s basically how react-admin works.</p>

<p>The list is already functional: you can reorder it by clicking on column headers, or change pages by using the bottom pagination controls. The <code class=" highlighter-rouge language-plaintext">ra-data-json-server</code> data provider translates these actions to a query string that JSONPlaceholder understands.</p>

<h2 id="selecting-columns">Selecting Columns</h2>

<p>The <code class=" highlighter-rouge language-plaintext">&lt;ListGuesser&gt;</code> component is not meant to be used in production - it’s just a way to quickly bootstrap an admin. That means you’ll have to replace the <code class=" highlighter-rouge language-plaintext">ListGuesser</code> component in the <code class=" highlighter-rouge language-plaintext">users</code> resource by a custom React component. Fortunately, <code class=" highlighter-rouge language-plaintext">ListGuesser</code> dumps the code of the list it has guessed to the console:</p>

<p><a href="./img/tutorial_guessed_list.png"><img src="/react-admin/img/tutorial_guessed_list.png" alt="Guessed Users List"></a></p>

<p>Let’s copy this code, and create a new <code class=" highlighter-rouge language-plaintext">UserList</code> component, in a new file named <code class=" highlighter-rouge language-plaintext">users.js</code>:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/users.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> List<span class="token punctuation">,</span> Datagrid<span class="token punctuation">,</span> TextField<span class="token punctuation">,</span> EmailField <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">UserList</span> <span class="token operator">=</span> props <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>List</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Datagrid</span> <span class="token attr-name">rowClick</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>edit<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>EmailField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>address.street<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>phone<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>website<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>company.name<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Datagrid</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>List</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p>Then, edit the <code class=" highlighter-rouge language-plaintext">App.js</code> file to use this new component instead of <code class=" highlighter-rouge language-plaintext">ListGuesser</code>:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/App.js
<span class="token deleted">-import { Admin, Resource, ListGuesser } from 'react-admin';</span>
<span class="token inserted">+import { Admin, Resource } from 'react-admin';</span>
<span class="token inserted">+import { UserList } from './users';</span>

const App = () =&gt; (
    &lt;Admin dataProvider={dataProvider}&gt;
<span class="token deleted">-       &lt;Resource name="users" list={ListGuesser} /&gt;</span>
<span class="token inserted">+       &lt;Resource name="users" list={UserList} /&gt;</span>
    &lt;/Admin&gt;
);
</code></pre></div></div>

<p><a href="./img/tutorial_users_list.png"><img src="/react-admin/img/tutorial_users_list.png" alt="Users List"></a></p>

<p>There is no visible change in the browser - except now, the app uses a component that you can customize.</p>

<p>The main component of the users list is a <code class=" highlighter-rouge language-plaintext">&lt;List&gt;</code> component, responsible for grabbing the information from the API, displaying the page title, and handling pagination. This component then delegates the display of the actual list of users to its child. In this case, that’s a <code class=" highlighter-rouge language-plaintext">&lt;Datagrid&gt;</code> component, which renders a table with one row for each record. The Datagrid uses its child components (here, a list of <code class=" highlighter-rouge language-plaintext">&lt;TextField&gt;</code> and <code class=" highlighter-rouge language-plaintext">&lt;EmailField&gt;</code>) to determine the columns to render. Each Field component maps a different field in the API response, specified by the <code class=" highlighter-rouge language-plaintext">source</code> prop.</p>

<p>The <code class=" highlighter-rouge language-plaintext">ListGuesser</code> created one column for every field in the response. That’s a bit too much for a usable grid, so let’s remove a couple <code class=" highlighter-rouge language-plaintext">&lt;TextField&gt;</code> from the Datagrid and see the effect:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/users.js
import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList = props =&gt; (
    &lt;List {...props}&gt;
        &lt;Datagrid rowClick="edit"&gt;
            &lt;TextField source="id" /&gt;
            &lt;TextField source="name" /&gt;
<span class="token deleted">-           &lt;TextField source="username" /&gt;</span>
            &lt;EmailField source="email" /&gt;
<span class="token deleted">-           &lt;TextField source="address.street" /&gt;</span>
            &lt;TextField source="phone" /&gt;
            &lt;TextField source="website" /&gt;
            &lt;TextField source="company.name" /&gt;
        &lt;/Datagrid&gt;
    &lt;/List&gt;
);
</code></pre></div></div>

<p><a href="./img/tutorial_users_list_selected_columns.png"><img src="/react-admin/img/tutorial_users_list_selected_columns.png" alt="Users List"></a></p>

<p>What you’ve just done reflects the early stages of development with react-admin: let the guesser do the job, select only the fields you want, and start customizing types.</p>

<h2 id="using-field-types">Using Field Types</h2>

<p>You’ve just met the <code class=" highlighter-rouge language-plaintext">&lt;TextField&gt;</code> and the <code class=" highlighter-rouge language-plaintext">&lt;EmailField&gt;</code> components. React-admin provides <a href="/react-admin/Fields.html">many more Field components</a>, mapping various data types: number, date, image, HTML, array, reference, etc.</p>

<p>For instance, the <code class=" highlighter-rouge language-plaintext">website</code> field looks like a URL. Instead of displaying it as text, why not display it using a clickable link? That’s exactly what the <code class=" highlighter-rouge language-plaintext">&lt;UrlField&gt;</code> does:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/users.js
import * as React from "react";
<span class="token deleted">-import { List, Datagrid, TextField, EmailField } from 'react-admin';</span>
<span class="token inserted">+import { List, Datagrid, TextField, EmailField, UrlField } from 'react-admin';</span>

export const UserList = props =&gt; (
    &lt;List {...props}&gt;
        &lt;Datagrid rowClick="edit"&gt;
            &lt;TextField source="id" /&gt;
            &lt;TextField source="name" /&gt;
            &lt;EmailField source="email" /&gt;
            &lt;TextField source="phone" /&gt;
<span class="token deleted">-           &lt;TextField source="website" /&gt;</span>
<span class="token inserted">+           &lt;UrlField source="website" /&gt;</span>
            &lt;TextField source="company.name" /&gt;
        &lt;/Datagrid&gt;
    &lt;/List&gt;
);
</code></pre></div></div>

<p><a href="./img/tutorial_url_field.png"><img src="/react-admin/img/tutorial_url_field.png" alt="Url Field"></a></p>

<p>In react-admin, fields are simple React components. At runtime, they grab the <code class=" highlighter-rouge language-plaintext">record</code> fetched from the API (e.g. <code class=" highlighter-rouge language-plaintext">{ "id": 2, "name": "Ervin Howell", "website": "anastasia.net", ... }</code>) with a custom hook, and use the <code class=" highlighter-rouge language-plaintext">source</code> field (e.g. <code class=" highlighter-rouge language-plaintext">website</code>) to get the value they should display (e.g. “anastasia.net”).</p>

<p>That means that writing a custom Field component is really straightforward. For instance, here is a simplified version of the <code class=" highlighter-rouge language-plaintext">UrlField</code>:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/MyUrlField.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRecordContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">MyUrlField</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> source <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> record <span class="token operator">=</span> <span class="token function">useRecordContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> record <span class="token operator">?</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record<span class="token punctuation">[</span>source<span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>record<span class="token punctuation">[</span>source<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> MyUrlField<span class="token punctuation">;</span>
</code></pre></div></div>

<p>You can use this component in <code class=" highlighter-rouge language-plaintext">&lt;UserList&gt;</code>, instead of react-admin’s <code class=" highlighter-rouge language-plaintext">&lt;UrlField&gt;</code> component, and it will work just the same.</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/users.js
import * as React from "react";
<span class="token deleted">-import { List, Datagrid, TextField, EmailField, UrlField } from 'react-admin';</span>
<span class="token inserted">+import { List, Datagrid, TextField, EmailField } from 'react-admin';</span>
<span class="token inserted">+import MyUrlField from './MyUrlField';</span>

export const UserList = props =&gt; (
    &lt;List {...props}&gt;
        &lt;Datagrid rowClick="edit"&gt;
            &lt;TextField source="id" /&gt;
            &lt;TextField source="name" /&gt;
            &lt;EmailField source="email" /&gt;
            &lt;TextField source="phone" /&gt;
<span class="token deleted">-           &lt;UrlField source="website" /&gt;</span>
<span class="token inserted">+           &lt;MyUrlField source="website" /&gt;</span>
            &lt;TextField source="company.name" /&gt;
        &lt;/Datagrid&gt;
    &lt;/List&gt;
);
</code></pre></div></div>

<p>Yes, you can replace any of react-admin’s components with your own! That means react-admin never blocks you: if one react-admin component doesn’t perfectly suit your needs, you can easily swap it with your own version.</p>

<h2 id="customizing-styles">Customizing Styles</h2>

<p>The <code class=" highlighter-rouge language-plaintext">MyUrlField</code> component is a perfect opportunity to illustrate how to customize styles. React-admin relies on <a href="https://v4.mui.com/">material-ui</a>, a set of React components modeled after Google’s <a href="https://material.io/">Material Design UI Guidelines</a>. Material-ui uses <a href="https://github.com/cssinjs/jss">JSS</a>, a CSS-in-JS solution, for styling components. Let’s take advantage of the capabilities of JSS to remove the underline from the link and add an icon:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/MyUrlField.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRecordContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> makeStyles <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@material-ui/core/styles'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> LaunchIcon <span class="token keyword">from</span> <span class="token string">'@material-ui/icons/Launch'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> useStyles <span class="token operator">=</span> <span class="token function">makeStyles</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    link<span class="token punctuation">:</span> <span class="token punctuation">{</span>
        textDecoration<span class="token punctuation">:</span> <span class="token string">'none'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    icon<span class="token punctuation">:</span> <span class="token punctuation">{</span>
        width<span class="token punctuation">:</span> <span class="token string">'0.5em'</span><span class="token punctuation">,</span>
        height<span class="token punctuation">:</span> <span class="token string">'0.5em'</span><span class="token punctuation">,</span>
        paddingLeft<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">MyUrlField</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> source <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> record <span class="token operator">=</span> <span class="token function">useRecordContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> classes <span class="token operator">=</span> <span class="token function">useStyles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> record <span class="token operator">?</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record<span class="token punctuation">[</span>source<span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>classes<span class="token punctuation">.</span>link<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>record<span class="token punctuation">[</span>source<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LaunchIcon</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>classes<span class="token punctuation">.</span>icon<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> MyUrlField<span class="token punctuation">;</span>
</code></pre></div></div>

<p><a href="./img/tutorial_custom_styles.png"><img src="/react-admin/img/tutorial_custom_styles.png" alt="Custom styles"></a></p>

<p>In JSS, you define styles as a JavaScript object, using the JS variants of the CSS property names (e.g. <code class=" highlighter-rouge language-plaintext">textDecoration</code> instead of <code class=" highlighter-rouge language-plaintext">text-decoration</code>). To pass these styles to the component, use <code class=" highlighter-rouge language-plaintext">makeStyles</code> to build a React hook. The hook will create new class names for these styles, and return the new class names in the <code class=" highlighter-rouge language-plaintext">classes</code> object. Then, use these names in a <code class=" highlighter-rouge language-plaintext">className</code> prop, as you would with a regular CSS class.</p>

<p><strong>Tip</strong>: There is much more to JSS than what this tutorial covers. Read the <a href="https://v4.mui.com/styles/basics">material-ui documentation</a> to learn more about theming, vendor prefixes, responsive utilities, etc.</p>

<p><strong>Tip</strong>: Material-ui supports other CSS-in-JS solutions, including <a href="https://v4.mui.com/styles/basics/#styled-components-api">Styled components</a>.</p>

<h2 id="handling-relationships">Handling Relationships</h2>

<p>In JSONPlaceholder, each <code class=" highlighter-rouge language-plaintext">post</code> record includes a <code class=" highlighter-rouge language-plaintext">userId</code> field, which points to a <code class=" highlighter-rouge language-plaintext">user</code>:</p>

<div class="language-json highlighter-rouge"><div class="highlight"><pre class="highlight language-json"><code class=" language-json">{
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    "userId": 1
}
</code></pre></div></div>

<p>React-admin knows how to take advantage of these foreign keys to fetch references. Let’s see how the <code class=" highlighter-rouge language-plaintext">ListGuesser</code> manages them by creating a new <code class=" highlighter-rouge language-plaintext">&lt;Resource&gt;</code> for the <code class=" highlighter-rouge language-plaintext">/posts</code> API endpoint:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/App.js
import * as React from "react";
<span class="token deleted">-import { Admin, Resource } from 'react-admin';</span>
<span class="token inserted">+import { Admin, Resource, ListGuesser } from 'react-admin';</span>
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './users';

const App = () =&gt; (
    &lt;Admin dataProvider={dataProvider}&gt;
<span class="token inserted">+       &lt;Resource name="posts" list={ListGuesser} /&gt;</span>
        &lt;Resource name="users" list={UserList} /&gt;
    &lt;/Admin&gt;
);

export default App;
</code></pre></div></div>

<p><a href="./img/tutorial_guessed_post_list.png"><img src="/react-admin/img/tutorial_guessed_post_list.png" alt="Guessed Post List"></a></p>

<p>The <code class=" highlighter-rouge language-plaintext">ListGuesser</code> suggests using a <code class=" highlighter-rouge language-plaintext">&lt;ReferenceField&gt;</code> for the <code class=" highlighter-rouge language-plaintext">userId</code> field. Let’s play with this new field by creating the <code class=" highlighter-rouge language-plaintext">PostList</code> component based on the code dumped by the guesser:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/posts.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> List<span class="token punctuation">,</span> Datagrid<span class="token punctuation">,</span> TextField<span class="token punctuation">,</span> ReferenceField <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">PostList</span> <span class="token operator">=</span> props <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>List</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Datagrid</span> <span class="token attr-name">rowClick</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>edit<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ReferenceField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>userId<span class="token punctuation">"</span></span> <span class="token attr-name">reference</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>users<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ReferenceField</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Datagrid</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>List</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/App.js
<span class="token deleted">-import { Admin, Resource, ListGuesser } from 'react-admin';</span>
<span class="token inserted">+import { Admin, Resource } from 'react-admin';</span>
<span class="token inserted">+import { PostList } from './posts';</span>
import { UserList } from './users';

const App = () =&gt; (
    &lt;Admin dataProvider={dataProvider}&gt;
<span class="token deleted">-       &lt;Resource name="posts" list={ListGuesser} /&gt;</span>
<span class="token inserted">+       &lt;Resource name="posts" list={PostList} /&gt;</span>
        &lt;Resource name="users" list={UserList} /&gt;
    &lt;/Admin&gt;
);
</code></pre></div></div>

<p>When displaying the posts list, the app displays the <code class=" highlighter-rouge language-plaintext">id</code> of the post author as a <code class=" highlighter-rouge language-plaintext">&lt;TextField&gt;</code>. This <code class=" highlighter-rouge language-plaintext">id</code> field doesn’t mean much, let’s use the user <code class=" highlighter-rouge language-plaintext">name</code> instead:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/posts.js
export const PostList = props =&gt; (
    &lt;List {...props}&gt;
        &lt;Datagrid rowClick="edit"&gt;
            &lt;ReferenceField source="userId" reference="users"&gt;
<span class="token deleted">-               &lt;TextField source="id" /&gt;</span>
<span class="token inserted">+               &lt;TextField source="name" /&gt;</span>
            &lt;/ReferenceField&gt;
            &lt;TextField source="id" /&gt;
            &lt;TextField source="title" /&gt;
            &lt;TextField source="body" /&gt;
        &lt;/Datagrid&gt;
    &lt;/List&gt;
);
</code></pre></div></div>

<p>The post list now displays the user names on each line.</p>

<p><a href="./img/tutorial_list_user_name.png"><img src="/react-admin/img/tutorial_list_user_name.png" alt="Post List With User Names"></a></p>

<p><strong>Tip</strong>: The <code class=" highlighter-rouge language-plaintext">&lt;ReferenceField&gt;</code> component alone doesn’t display anything. It just fetches the reference data, and passes it as a <code class=" highlighter-rouge language-plaintext">record</code> to its child component (a <code class=" highlighter-rouge language-plaintext">&lt;TextField&gt;</code> in our case). Just like the <code class=" highlighter-rouge language-plaintext">&lt;List&gt;</code> component, all <code class=" highlighter-rouge language-plaintext">&lt;Reference&gt;</code> components are only responsible for fetching and preparing data, and delegate rendering to their children.</p>

<p><strong>Tip</strong>: Look at the network tab of your browser again: react-admin deduplicates requests for users, and aggregates them in order to make only <em>one</em> HTTP request to the <code class=" highlighter-rouge language-plaintext">/users</code> endpoint for the whole Datagrid. That’s one of many optimizations that keep the UI fast and responsive.</p>

<p>To finish the post list, place the post <code class=" highlighter-rouge language-plaintext">id</code> field as first column, and remove the <code class=" highlighter-rouge language-plaintext">body</code> field. From a UX point of view, fields containing large chunks of text should not appear in a Datagrid, only in detail views. Also, to make the Edit action stand out, let’s replace the <code class=" highlighter-rouge language-plaintext">rowClick</code> action by an explicit action button:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/posts.js
import * as React from "react";
<span class="token deleted">-import { List, Datagrid, TextField, ReferenceField } from 'react-admin';</span>
<span class="token inserted">+import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';</span>

export const PostList = props =&gt; (
    &lt;List {...props}&gt;
<span class="token deleted">-       &lt;Datagrid rowClick="edit"&gt;</span>
<span class="token inserted">+       &lt;Datagrid&gt;</span>
<span class="token inserted">+           &lt;TextField source="id" /&gt;</span>
            &lt;ReferenceField source="userId" reference="users"&gt;
                &lt;TextField source="name" /&gt;
            &lt;/ReferenceField&gt;
<span class="token deleted">-           &lt;TextField source="id" /&gt;</span>
            &lt;TextField source="title" /&gt;
<span class="token deleted">-           &lt;TextField source="body" /&gt;</span>
<span class="token inserted">+           &lt;EditButton /&gt;</span>
        &lt;/Datagrid&gt;
    &lt;/List&gt;
);
</code></pre></div></div>

<p><a href="./img/tutorial_post_list_less_columns.png"><img src="/react-admin/img/tutorial_post_list_less_columns.png" alt="Post List With Less Columns"></a></p>

<h2 id="adding-creation-and-editing-capabilities">Adding Creation and Editing Capabilities</h2>

<p>An admin interface isn’t just about displaying remote data, it should also allow editing records. React-admin provides an <code class=" highlighter-rouge language-plaintext">&lt;Edit&gt;</code> components for that purpose ; let’s use the <code class=" highlighter-rouge language-plaintext">&lt;EditGuesser&gt;</code> to help bootstrap it.</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/App.js
<span class="token deleted">-import { Admin, Resource } from 'react-admin';</span>
<span class="token inserted">+import { Admin, Resource, EditGuesser } from 'react-admin';</span>
import { PostList } from './posts';
import { UserList } from './users';

const App = () =&gt; (
    &lt;Admin dataProvider={dataProvider}&gt;
<span class="token deleted">-       &lt;Resource name="posts" list={PostList} /&gt;</span>
<span class="token inserted">+       &lt;Resource name="posts" list={PostList} edit={EditGuesser} /&gt;</span>
        &lt;Resource name="users" list={UserList} /&gt;
    &lt;/Admin&gt;
);
</code></pre></div></div>

<p><a href="./img/tutorial_edit_guesser.gif"><img src="/react-admin/img/tutorial_edit_guesser.gif" alt="Post Edit Guesser"></a></p>

<p>Users can display the edit page just by clicking on the Edit button. The form rendered is already functional; it issues <code class=" highlighter-rouge language-plaintext">PUT</code> requests to the REST API upon submission.</p>

<p>Copy the <code class=" highlighter-rouge language-plaintext">PostEdit</code> code dumped by the guesser in the console to the <code class=" highlighter-rouge language-plaintext">posts.js</code> file so that you can customize the view. Don’t forget to <code class=" highlighter-rouge language-plaintext">import</code> the new components from react-admin:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/posts.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
    List<span class="token punctuation">,</span>
    Datagrid<span class="token punctuation">,</span>
    TextField<span class="token punctuation">,</span>
    ReferenceField<span class="token punctuation">,</span>
    EditButton<span class="token punctuation">,</span>
    Edit<span class="token punctuation">,</span>
    SimpleForm<span class="token punctuation">,</span>
    ReferenceInput<span class="token punctuation">,</span>
    SelectInput<span class="token punctuation">,</span>
    TextInput<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">PostList</span> <span class="token operator">=</span> props <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
  <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">PostEdit</span> <span class="token operator">=</span> props <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Edit</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SimpleForm</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ReferenceInput</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>userId<span class="token punctuation">"</span></span> <span class="token attr-name">reference</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>users<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SelectInput</span> <span class="token attr-name">optionText</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ReferenceInput</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextInput</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextInput</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextInput</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>SimpleForm</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Edit</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p>You can now adjust the <code class=" highlighter-rouge language-plaintext">PostEdit</code> component to disable the edition of the primary key (<code class=" highlighter-rouge language-plaintext">id</code>), place it first, use the user <code class=" highlighter-rouge language-plaintext">name</code> instead of the user <code class=" highlighter-rouge language-plaintext">id</code> in the reference, and use a longer text input for the <code class=" highlighter-rouge language-plaintext">body</code> field, as follows:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/posts.js
export const PostEdit = props =&gt; (
    &lt;Edit {...props}&gt;
        &lt;SimpleForm&gt;
<span class="token inserted">+           &lt;TextInput disabled source="id" /&gt;</span>
            &lt;ReferenceInput source="userId" reference="users"&gt;
<span class="token deleted">-               &lt;SelectInput optionText="id" /&gt;</span>
<span class="token inserted">+               &lt;SelectInput optionText="name" /&gt;</span>
            &lt;/ReferenceInput&gt;
<span class="token deleted">-           &lt;TextInput source="id" /&gt;</span>
            &lt;TextInput source="title" /&gt;
<span class="token deleted">-           &lt;TextInput source="body" /&gt;</span>
<span class="token inserted">+           &lt;TextInput multiline source="body" /&gt;</span>
        &lt;/SimpleForm&gt;
    &lt;/Edit&gt;
);
</code></pre></div></div>

<p>If you’ve understood the <code class=" highlighter-rouge language-plaintext">&lt;List&gt;</code> component, the <code class=" highlighter-rouge language-plaintext">&lt;Edit&gt;</code> component will be no surprise. It’s responsible for fetching the record, and displaying the page title. It passes the record down to the <code class=" highlighter-rouge language-plaintext">&lt;SimpleForm&gt;</code> component, which is responsible for the form layout, default values, and validation. Just like <code class=" highlighter-rouge language-plaintext">&lt;Datagrid&gt;</code>, <code class=" highlighter-rouge language-plaintext">&lt;SimpleForm&gt;</code> uses its children to determine the form inputs to display. It expects <em>input components</em> as children. <code class=" highlighter-rouge language-plaintext">&lt;TextInput&gt;</code>, <code class=" highlighter-rouge language-plaintext">&lt;ReferenceInput&gt;</code>, and <code class=" highlighter-rouge language-plaintext">&lt;SelectInput&gt;</code> are such inputs.</p>

<p>The <code class=" highlighter-rouge language-plaintext">&lt;ReferenceInput&gt;</code> takes the same props as the <code class=" highlighter-rouge language-plaintext">&lt;ReferenceField&gt;</code> (used earlier in the <code class=" highlighter-rouge language-plaintext">PostList</code> page). <code class=" highlighter-rouge language-plaintext">&lt;ReferenceInput&gt;</code> uses these props to fetch the API for possible references related to the current record (in this case, possible <code class=" highlighter-rouge language-plaintext">users</code> for the current <code class=" highlighter-rouge language-plaintext">post</code>). It then passes these possible references to the child component (<code class=" highlighter-rouge language-plaintext">&lt;SelectInput&gt;</code>), which is responsible for displaying them (via their <code class=" highlighter-rouge language-plaintext">name</code> in that case), and letting the user select one. <code class=" highlighter-rouge language-plaintext">&lt;SelectInput&gt;</code> renders as a <code class=" highlighter-rouge language-plaintext">&lt;select&gt;</code> tag in HTML.</p>

<p>Before you can use that custom component in the <code class=" highlighter-rouge language-plaintext">App.js</code>, copy the <code class=" highlighter-rouge language-plaintext">PostEdit</code> component into a <code class=" highlighter-rouge language-plaintext">PostCreate</code>, and replace <code class=" highlighter-rouge language-plaintext">Edit</code> by <code class=" highlighter-rouge language-plaintext">Create</code>:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/posts.js
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
<span class="token inserted">+   Create,</span>
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
} from 'react-admin';

export const PostList = props =&gt; (
    // ...
);

export const PostEdit = props =&gt; (
    // ...
);

<span class="token inserted">+export const PostCreate = props =&gt; (</span>
<span class="token inserted">+    &lt;Create {...props}&gt;</span>
<span class="token inserted">+        &lt;SimpleForm&gt;</span>
<span class="token inserted">+            &lt;ReferenceInput source="userId" reference="users"&gt;</span>
<span class="token inserted">+                &lt;SelectInput optionText="name" /&gt;</span>
<span class="token inserted">+            &lt;/ReferenceInput&gt;</span>
<span class="token inserted">+            &lt;TextInput source="title" /&gt;</span>
<span class="token inserted">+            &lt;TextInput multiline source="body" /&gt;</span>
<span class="token inserted">+        &lt;/SimpleForm&gt;</span>
<span class="token inserted">+    &lt;/Create&gt;</span>
<span class="token inserted">+);</span>
</code></pre></div></div>

<p><strong>Tip</strong>: The <code class=" highlighter-rouge language-plaintext">&lt;PostEdit&gt;</code> and the <code class=" highlighter-rouge language-plaintext">&lt;PostCreate&gt;</code> components use almost the same child form, except for the additional <code class=" highlighter-rouge language-plaintext">id</code> input in <code class=" highlighter-rouge language-plaintext">&lt;PostEdit&gt;</code>. In most cases, the forms for creating and editing a record are a bit different, because most APIs create primary keys server-side. But if the forms are the same, you can share a common form component in <code class=" highlighter-rouge language-plaintext">&lt;PostEdit&gt;</code> and <code class=" highlighter-rouge language-plaintext">&lt;PostCreate&gt;</code>.</p>

<p>To use the new <code class=" highlighter-rouge language-plaintext">&lt;PostEdit&gt;</code> and <code class=" highlighter-rouge language-plaintext">&lt;PostCreate&gt;</code> components in the posts resource, just add them as <code class=" highlighter-rouge language-plaintext">edit</code> and <code class=" highlighter-rouge language-plaintext">create</code> attributes in the <code class=" highlighter-rouge language-plaintext">&lt;Resource name="posts"&gt;</code> component:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/App.js
<span class="token deleted">-import { Admin, Resource, EditGuesser } from 'react-admin';</span>
<span class="token inserted">+import { Admin, Resource } from 'react-admin';</span>
<span class="token deleted">-import { PostList } from './posts';</span>
<span class="token inserted">+import { PostList, PostEdit, PostCreate } from './posts';</span>
import { UserList } from './users';

const App = () =&gt; (
    &lt;Admin dataProvider={dataProvider}&gt;
<span class="token deleted">-       &lt;Resource name="posts" list={PostList} edit={EditGuesser} /&gt;</span>
<span class="token inserted">+       &lt;Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} /&gt;</span>
        &lt;Resource name="users" list={UserList} /&gt;
    &lt;/Admin&gt;
);
</code></pre></div></div>

<p><a href="./img/tutorial_post_create.gif"><img src="/react-admin/img/tutorial_post_create.gif" alt="Post Creation"></a></p>

<p>React-admin automatically adds a “create” button on top of the posts list to give access to the <code class=" highlighter-rouge language-plaintext">&lt;PostCreate&gt;</code> component. And the creation form works ; it issues a <code class=" highlighter-rouge language-plaintext">POST</code> request to the REST API upon submission.</p>

<h2 id="optimistic-rendering-and-undo">Optimistic Rendering And Undo</h2>

<p>Unfortunately, JSONPlaceholder is a read-only API; although it seems to accept <code class=" highlighter-rouge language-plaintext">POST</code> and <code class=" highlighter-rouge language-plaintext">PUT</code> requests, it doesn’t take into account the creations and edits - that’s why, in this particular case, you will see errors after creation, and you won’t see your edits after you save them. It’s just an artifact of JSONPlaceholder.</p>

<p>But then, how come the newly created post appears in the list just after creation in the screencast above?</p>

<p>That’s because react-admin uses <em>optimistic rendering</em>. When a user edits a record and hits the “Save” button, the UI shows a confirmation and displays the updated data <em>before sending the update query to server</em>. The main benefit is that UI changes are immediate - no need to wait for the server response. It’s a great comfort for users.</p>

<p>But there is an additional benefit: it also allows the “Undo” feature. Undo is already functional in the admin at that point. Try editing a record, then hit the “Undo” link in the black confirmation box before it slides out. You’ll see that the app does not send the <code class=" highlighter-rouge language-plaintext">UPDATE</code> query to the API, and displays the non-modified data.</p>

<p><a href="./img/tutorial_post_edit_undo.gif"><img src="/react-admin/img/tutorial_post_edit_undo.gif" alt="Undo Post Editing"></a></p>

<p>Even though updates appear immediately due to Optimistic Rendering, React-admin only sends them to the server after a short delay (about 5 seconds). During this delay, the user can undo the action, and react-admin will never send the update.</p>

<p>Optimistic Rendering and Undo require no specific code on the API side - react-admin handles them purely on the client-side. That means that you’ll get them for free with your own API!</p>

<p><strong>Note</strong>: When you add the ability to edit an item, you also add the ability to delete it. The “Delete” button in the edit view is fully working out of the box - and it is also “Undo”-able .</p>

<p>The post editing page has a slight problem: it uses the post id as main title (the text displayed in the top bar). Let’s customize the view title with a title component:</p>

<div class="language-diff highlighter-rouge"><div class="highlight"><pre class="highlight language-diff"><code class=" language-diff">// in src/posts.js
<span class="token inserted">+const PostTitle = ({ record }) =&gt; {</span>
<span class="token inserted">+    return &lt;span&gt;Post {record ? `"${record.title}"` : ''}&lt;/span&gt;;</span>
<span class="token inserted">+};</span>

export const PostEdit = props =&gt; (
<span class="token deleted">-   &lt;Edit {...props}&gt;</span>
<span class="token inserted">+   &lt;Edit title={&lt;PostTitle /&gt;} {...props}&gt;</span>
        // ...
    &lt;/Edit&gt;
);
</code></pre></div></div>

<p><a href="./img/tutorial_post_title.png"><img src="/react-admin/img/tutorial_post_title.png" alt="Post Edit Title"></a></p>

<h2 id="adding-search-and-filters-to-the-list">Adding Search And Filters To The List</h2>

<p>Let’s get back to the post list for a minute. It offers sorting and pagination, but one feature is missing: the ability to search content.</p>

<p>React-admin can use Input components to create a multi-criteria search engine in the list view. Pass an array of such Input components to the List <code class=" highlighter-rouge language-plaintext">filters</code> prop to enable filtering:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/posts.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ReferenceInput<span class="token punctuation">,</span> SelectInput<span class="token punctuation">,</span> TextInput<span class="token punctuation">,</span> List <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> postFilters <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextInput</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>q<span class="token punctuation">"</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Search<span class="token punctuation">"</span></span> <span class="token attr-name">alwaysOn</span> <span class="token punctuation">/&gt;</span></span><span class="token punctuation">,</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ReferenceInput</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>userId<span class="token punctuation">"</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>User<span class="token punctuation">"</span></span> <span class="token attr-name">reference</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>users<span class="token punctuation">"</span></span> <span class="token attr-name">allowEmpty</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SelectInput</span> <span class="token attr-name">optionText</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ReferenceInput</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">PostList</span> <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>List</span> <span class="token attr-name">filters</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>postFilters<span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        // ...
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>List</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p>The first filter, ‘q’, takes advantage of a full-text functionality offered by JSONPlaceholder. It is <code class=" highlighter-rouge language-plaintext">alwaysOn</code>, so it always appears on the screen. Users can add the second filter, <code class=" highlighter-rouge language-plaintext">userId</code>, thanks to the “add filter” button, located on the top of the list. As it’s a <code class=" highlighter-rouge language-plaintext">&lt;ReferenceInput&gt;</code>, it’s already populated with possible users.</p>

<p><a href="./img/filters.gif"><img src="/react-admin/img/filters.gif" alt="posts search engine"></a></p>

<p>Filters are “search-as-you-type”, meaning that when the user enters new values in the filter form, the list refreshes (via an API request) immediately.</p>

<p><strong>Tip</strong>: Note that the <code class=" highlighter-rouge language-plaintext">label</code> property can be used on any field to customize the field label.</p>

<h2 id="customizing-the-menu-icons">Customizing the Menu Icons</h2>

<p>The sidebar menu shows the same icon for both posts and users. Customizing the menu icon is just a matter of passing an <code class=" highlighter-rouge language-plaintext">icon</code> attribute to each <code class=" highlighter-rouge language-plaintext">&lt;Resource&gt;</code>:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/App.js</span>
<span class="token keyword">import</span> PostIcon <span class="token keyword">from</span> <span class="token string">'@material-ui/icons/Book'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> UserIcon <span class="token keyword">from</span> <span class="token string">'@material-ui/icons/Group'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Admin</span> <span class="token attr-name">dataProvider</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>dataProvider<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Resource</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>posts<span class="token punctuation">"</span></span> <span class="token attr-name">list</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>PostList<span class="token punctuation">}</span></span> <span class="token attr-name">edit</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>PostEdit<span class="token punctuation">}</span></span> <span class="token attr-name">create</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>PostCreate<span class="token punctuation">}</span></span> <span class="token attr-name">icon</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>PostIcon<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Resource</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>users<span class="token punctuation">"</span></span> <span class="token attr-name">list</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>UserList<span class="token punctuation">}</span></span> <span class="token attr-name">icon</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>UserIcon<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Admin</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p><a href="./img/custom-menu.gif"><img src="/react-admin/img/custom-menu.gif" alt="custom menu icons"></a></p>

<h2 id="using-a-custom-home-page">Using a Custom Home Page</h2>

<p>By default, react-admin displays the list page of the first <code class=" highlighter-rouge language-plaintext">Resource</code> element as home page. If you want to display a custom component instead, pass it in the <code class=" highlighter-rouge language-plaintext">dashboard</code> prop of the <code class=" highlighter-rouge language-plaintext">&lt;Admin&gt;</code> component.</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/Dashboard.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Card<span class="token punctuation">,</span> CardContent<span class="token punctuation">,</span> CardHeader <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@material-ui/core'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Card</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CardHeader</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Welcome to the administration<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CardContent</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Lorem ipsum sic dolor amet...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CardContent</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Card</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/App.js</span>
<span class="token keyword">import</span> Dashboard <span class="token keyword">from</span> <span class="token string">'./Dashboard'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Admin</span> <span class="token attr-name">dashboard</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>Dashboard<span class="token punctuation">}</span></span> <span class="token attr-name">dataProvider</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>dataProvider<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        // ...
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Admin</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p><a href="./img/dashboard.png"><img src="/react-admin/img/dashboard.png" alt="Custom home page"></a></p>

<h2 id="adding-a-login-page">Adding a Login Page</h2>

<p>Most admin apps require authentication. React-admin can check user credentials before displaying a page, and redirect to a login form when the REST API returns a 403 error code.</p>

<p><em>What</em> those credentials are, and <em>how</em> to get them, are questions that you, as a developer, must answer. React-admin makes no assumption about your authentication strategy (basic auth, OAuth, custom route, etc.), but gives you the ability to plug your logic at the right place - using the <code class=" highlighter-rouge language-plaintext">authProvider</code> object.</p>

<p>For this tutorial, since there is no public authentication API, we can use a fake authentication provider that accepts every login request, and stores the <code class=" highlighter-rouge language-plaintext">username</code> in <code class=" highlighter-rouge language-plaintext">localStorage</code>. Each page change will require that <code class=" highlighter-rouge language-plaintext">localStorage</code> contains a <code class=" highlighter-rouge language-plaintext">username</code> item.</p>

<p>The <code class=" highlighter-rouge language-plaintext">authProvider</code> must expose 5 methods, each returning a <code class=" highlighter-rouge language-plaintext">Promise</code>:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/authProvider.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token comment">// called when the user attempts to log in</span>
    login<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> username <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'username'</span><span class="token punctuation">,</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// accept all username/password combinations</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// called when the user clicks on the logout button</span>
    logout<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'username'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// called when the API returns an error</span>
    checkError<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> status <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> <span class="token number">401</span> <span class="token operator">||</span> status <span class="token operator">===</span> <span class="token number">403</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'username'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// called when the user navigates to a new location, to check for authentication</span>
    checkAuth<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'username'</span><span class="token punctuation">)</span>
            <span class="token operator">?</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">:</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// called when the user navigates to a new location, to check for permissions / roles</span>
    getPermissions<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p><strong>Tip</strong>: As the <code class=" highlighter-rouge language-plaintext">authProvider</code> calls are asynchronous, you can easily fetch an authentication server in there.</p>

<p>To enable this authentication strategy, pass the client as the <code class=" highlighter-rouge language-plaintext">authProvider</code> prop in the <code class=" highlighter-rouge language-plaintext">&lt;Admin&gt;</code> component:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/App.js</span>
<span class="token keyword">import</span> Dashboard <span class="token keyword">from</span> <span class="token string">'./Dashboard'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> authProvider <span class="token keyword">from</span> <span class="token string">'./authProvider'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Admin</span> <span class="token attr-name">dashboard</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>Dashboard<span class="token punctuation">}</span></span> <span class="token attr-name">authProvider</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>authProvider<span class="token punctuation">}</span></span> <span class="token attr-name">dataProvider</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>dataProvider<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        // ...
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Admin</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p>Once the app reloads, it’s now behind a login form that accepts everyone:</p>

<p><a href="./img/login.gif"><img src="/react-admin/img/login.gif" alt="Login form"></a></p>

<h2 id="supporting-mobile-devices">Supporting Mobile Devices</h2>

<p>The react-admin layout is already responsive. Try to resize your browser to see how the sidebar switches to a drawer on smaller screens.</p>

<p>But a responsive layout is not enough to make a responsive app. Datagrid components work well on desktop, but are absolutely not adapted to mobile devices. If your admin must be used on mobile devices, you’ll have to provide an alternative component for small screens.</p>

<p>First, you should know that you don’t have to use the <code class=" highlighter-rouge language-plaintext">&lt;Datagrid&gt;</code> component as <code class=" highlighter-rouge language-plaintext">&lt;List&gt;</code> child. You can use any other component you like. For instance, the <code class=" highlighter-rouge language-plaintext">&lt;SimpleList&gt;</code> component:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/posts.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> List<span class="token punctuation">,</span> SimpleList <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">PostList</span> <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>List</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SimpleList</span>
            <span class="token attr-name">primaryText</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record <span class="token operator">=&gt;</span> record<span class="token punctuation">.</span>title<span class="token punctuation">}</span></span>
            <span class="token attr-name">secondaryText</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>record<span class="token punctuation">.</span>views<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> views`</span></span><span class="token punctuation">}</span></span>
            <span class="token attr-name">tertiaryText</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span>published_at<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleDateString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
        <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>List</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p><a href="./img/tutorial_mobile_post_list.gif"><img src="/react-admin/img/tutorial_mobile_post_list.gif" alt="Mobile post list"></a></p>

<p>The <code class=" highlighter-rouge language-plaintext">&lt;SimpleList&gt;</code> component uses <a href="https://v4.mui.com/components/lists">material-ui’s <code class=" highlighter-rouge language-plaintext">&lt;List&gt;</code> and <code class=" highlighter-rouge language-plaintext">&lt;ListItem&gt;</code> components</a>, and expects functions as <code class=" highlighter-rouge language-plaintext">primaryText</code>, <code class=" highlighter-rouge language-plaintext">secondaryText</code>, and <code class=" highlighter-rouge language-plaintext">tertiaryText</code> props.</p>

<p><strong>Note:</strong> Since JSONRestServer doesn’t provide <code class=" highlighter-rouge language-plaintext">views</code> or <code class=" highlighter-rouge language-plaintext">published_at</code> values for posts, we switched to a custom API for those screenshots in order to demonstrate how to use some of the <code class=" highlighter-rouge language-plaintext">SimpleList</code> component props.</p>

<p>That works fine on mobile, but now the desktop user experience is worse. The best compromise would be to use <code class=" highlighter-rouge language-plaintext">&lt;SimpleList&gt;</code> on small screens, and <code class=" highlighter-rouge language-plaintext">&lt;Datagrid&gt;</code> on other screens. That’s where the <code class=" highlighter-rouge language-plaintext">useMediaQuery</code> hook comes in:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/posts.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useMediaQuery <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@material-ui/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> List<span class="token punctuation">,</span> SimpleList<span class="token punctuation">,</span> Datagrid<span class="token punctuation">,</span> TextField<span class="token punctuation">,</span> ReferenceField<span class="token punctuation">,</span> EditButton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">PostList</span> <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> isSmall <span class="token operator">=</span> <span class="token function">useMediaQuery</span><span class="token punctuation">(</span>theme <span class="token operator">=&gt;</span> theme<span class="token punctuation">.</span>breakpoints<span class="token punctuation">.</span><span class="token function">down</span><span class="token punctuation">(</span><span class="token string">'sm'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>List</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>isSmall <span class="token operator">?</span> <span class="token punctuation">(</span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SimpleList</span>
                    <span class="token attr-name">primaryText</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record <span class="token operator">=&gt;</span> record<span class="token punctuation">.</span>title<span class="token punctuation">}</span></span>
                    <span class="token attr-name">secondaryText</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>record<span class="token punctuation">.</span>views<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> views`</span></span><span class="token punctuation">}</span></span>
                    <span class="token attr-name">tertiaryText</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>record <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span>published_at<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleDateString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
                <span class="token punctuation">/&gt;</span></span>
            <span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token punctuation">(</span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Datagrid</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ReferenceField</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>User<span class="token punctuation">"</span></span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>userId<span class="token punctuation">"</span></span> <span class="token attr-name">reference</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>users<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ReferenceField</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextField</span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>EditButton</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Datagrid</span><span class="token punctuation">&gt;</span></span>
            <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>List</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></div>

<p>This works exactly the way you expect. The lesson here is that react-admin takes care of responsive web design for the layout, but it’s your job to use <code class=" highlighter-rouge language-plaintext">useMediaQuery()</code> in pages.</p>

<p><a href="./img/responsive-list.gif"><img src="/react-admin/img/responsive-list.gif" alt="Responsive List"></a></p>

<h2 id="connecting-to-a-real-api">Connecting To A Real API</h2>

<p>Here is the elephant in the room of this tutorial. In real world projects, the dialect of your API (REST? GraphQL? Something else?) won’t match the JSONPlaceholder dialect. Writing a Data Provider is probably the first thing you’ll have to do to make react-admin work. Depending on your API, this can require a few hours of additional work.</p>

<p>React-admin delegates every data query to a Data Provider object, which acts as an adapter to your API. This makes react-admin capable of mapping any API dialect, using endpoints from several domains, etc.</p>

<p>For instance, let’s imagine you have to use the <code class=" highlighter-rouge language-plaintext">my.api.url</code> REST API, which expects the following parameters:</p>

<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Expected API request</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Get list</td>
      <td><code class=" highlighter-rouge language-plaintext">GET http://my.api.url/posts?sort=["title","ASC"]&amp;range=[0, 24]&amp;filter={"title":"bar"}</code></td>
    </tr>
    <tr>
      <td>Get one record</td>
      <td><code class=" highlighter-rouge language-plaintext">GET http://my.api.url/posts/123</code></td>
    </tr>
    <tr>
      <td>Get several records</td>
      <td><code class=" highlighter-rouge language-plaintext">GET http://my.api.url/posts?filter={"id":[123,456,789]}</code></td>
    </tr>
    <tr>
      <td>Get related records</td>
      <td><code class=" highlighter-rouge language-plaintext">GET http://my.api.url/posts?filter={"author_id":345}</code></td>
    </tr>
    <tr>
      <td>Create a record</td>
      <td><code class=" highlighter-rouge language-plaintext">POST http://my.api.url/posts</code></td>
    </tr>
    <tr>
      <td>Update a record</td>
      <td><code class=" highlighter-rouge language-plaintext">PUT http://my.api.url/posts/123</code></td>
    </tr>
    <tr>
      <td>Update records</td>
      <td><code class=" highlighter-rouge language-plaintext">PUT http://my.api.url/posts?filter={"id":[123,124,125]}</code></td>
    </tr>
    <tr>
      <td>Delete a record</td>
      <td><code class=" highlighter-rouge language-plaintext">DELETE http://my.api.url/posts/123</code></td>
    </tr>
    <tr>
      <td>Delete records</td>
      <td><code class=" highlighter-rouge language-plaintext">DELETE http://my.api.url/posts?filter={"id":[123,124,125]}</code></td>
    </tr>
  </tbody>
</table>

<p>React-admin calls the Data Provider with one method for each of the actions of this list, and expects a Promise in return. These methods are called <code class=" highlighter-rouge language-plaintext">getList</code>, <code class=" highlighter-rouge language-plaintext">getOne</code>, <code class=" highlighter-rouge language-plaintext">getMany</code>, <code class=" highlighter-rouge language-plaintext">getManyReference</code>, <code class=" highlighter-rouge language-plaintext">create</code>, <code class=" highlighter-rouge language-plaintext">update</code>, <code class=" highlighter-rouge language-plaintext">updateMany</code>, <code class=" highlighter-rouge language-plaintext">delete</code>, and <code class=" highlighter-rouge language-plaintext">deleteMany</code>. It’s the Data Provider’s job to emit HTTP requests and transform the response into the format expected by react-admin.</p>

<p>The code for a Data Provider for the <code class=" highlighter-rouge language-plaintext">my.api.url</code> API is as follows:</p>

<div class="language-js highlighter-rouge"><div class="highlight"><pre class="highlight language-js"><code class=" language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> fetchUtils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-admin'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stringify <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'query-string'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> apiUrl <span class="token operator">=</span> <span class="token string">'https://my.api.com/'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> httpClient <span class="token operator">=</span> fetchUtils<span class="token punctuation">.</span>fetchJson<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    getList<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> page<span class="token punctuation">,</span> perPage <span class="token punctuation">}</span> <span class="token operator">=</span> params<span class="token punctuation">.</span>pagination<span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> field<span class="token punctuation">,</span> order <span class="token punctuation">}</span> <span class="token operator">=</span> params<span class="token punctuation">.</span>sort<span class="token punctuation">;</span>
        <span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token punctuation">{</span>
            sort<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">[</span>field<span class="token punctuation">,</span> order<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            range<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span>page <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> perPage<span class="token punctuation">,</span> page <span class="token operator">*</span> perPage <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            filter<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>filter<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">stringify</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token function">httpClient</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> headers<span class="token punctuation">,</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
            data<span class="token punctuation">:</span> json<span class="token punctuation">,</span>
            total<span class="token punctuation">:</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>headers<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'content-range'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    getOne<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        <span class="token function">httpClient</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>params<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
            data<span class="token punctuation">:</span> json<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    getMany<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token punctuation">{</span>
            filter<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">:</span> params<span class="token punctuation">.</span>ids <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">stringify</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">httpClient</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> data<span class="token punctuation">:</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    getManyReference<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> page<span class="token punctuation">,</span> perPage <span class="token punctuation">}</span> <span class="token operator">=</span> params<span class="token punctuation">.</span>pagination<span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> field<span class="token punctuation">,</span> order <span class="token punctuation">}</span> <span class="token operator">=</span> params<span class="token punctuation">.</span>sort<span class="token punctuation">;</span>
        <span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token punctuation">{</span>
            sort<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">[</span>field<span class="token punctuation">,</span> order<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            range<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span>page <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> perPage<span class="token punctuation">,</span> page <span class="token operator">*</span> perPage <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            filter<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token operator">...</span>params<span class="token punctuation">.</span>filter<span class="token punctuation">,</span>
                <span class="token punctuation">[</span>params<span class="token punctuation">.</span>target<span class="token punctuation">]</span><span class="token punctuation">:</span> params<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">stringify</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token function">httpClient</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> headers<span class="token punctuation">,</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
            data<span class="token punctuation">:</span> json<span class="token punctuation">,</span>
            total<span class="token punctuation">:</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>headers<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'content-range'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    update<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        <span class="token function">httpClient</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>params<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            method<span class="token punctuation">:</span> <span class="token string">'PUT'</span><span class="token punctuation">,</span>
            body<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> data<span class="token punctuation">:</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    updateMany<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token punctuation">{</span>
            filter<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">:</span> params<span class="token punctuation">.</span>ids<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">httpClient</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">stringify</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            method<span class="token punctuation">:</span> <span class="token string">'PUT'</span><span class="token punctuation">,</span>
            body<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> data<span class="token punctuation">:</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    create<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        <span class="token function">httpClient</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            method<span class="token punctuation">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span>
            body<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
            data<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token operator">...</span>params<span class="token punctuation">.</span>data<span class="token punctuation">,</span> id<span class="token punctuation">:</span> json<span class="token punctuation">.</span>id <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token keyword">delete</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        <span class="token function">httpClient</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>params<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            method<span class="token punctuation">:</span> <span class="token string">'DELETE'</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> data<span class="token punctuation">:</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    deleteMany<span class="token punctuation">:</span> <span class="token punctuation">(</span>resource<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token punctuation">{</span>
            filter<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">:</span> params<span class="token punctuation">.</span>ids<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">httpClient</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>apiUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>resource<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">stringify</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            method<span class="token punctuation">:</span> <span class="token string">'DELETE'</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> data<span class="token punctuation">:</span> json <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div></div>

<p><strong>Tip</strong>: <code class=" highlighter-rouge language-plaintext">fetchUtils.fetchJson()</code> is just a shortcut for <code class=" highlighter-rouge language-plaintext">fetch().then(r =&gt; r.json())</code>, plus a control of the HTTP response code to throw an <code class=" highlighter-rouge language-plaintext">HTTPError</code> in case of 4xx or 5xx response. Feel free to use <code class=" highlighter-rouge language-plaintext">fetch()</code> directly if it doesn’t suit your needs.</p>

<p>Using this provider instead of the previous <code class=" highlighter-rouge language-plaintext">jsonServerProvider</code> is just a matter of switching a function:</p>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight language-jsx"><code class=" language-jsx"><span class="token comment">// in src/app.js</span>
<span class="token keyword">import</span> dataProvider <span class="token keyword">from</span> <span class="token string">'./dataProvider'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Admin</span> <span class="token attr-name">dataProvider</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>dataProvider<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        // ...
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Admin</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></div>

<h2 id="conclusion">Conclusion</h2>

<p>React-admin was built with customization in mind. You can replace any react-admin component with a component of your own, for instance to display a custom list layout, or a different edit form for a given resource.</p>

<p>Now that you’ve completed the tutorial, continue reading the <a href="https://marmelab.com/react-admin/Readme.html">react-admin documentation</a>, and read the <a href="https://v4.mui.com/">Material UI components documentation</a>.</p>

          </div>
