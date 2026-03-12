import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useWallet } from "../solana/context/WalletContext";
import logo from "/assets/images/logo-center.png";
import { notifySuccess, notifyError } from "../solana/context/Notifications";
import { checkUserRegistered, registerUser } from "../solana/program";


function Register() {
  const { wallet } = useWallet();
  const { ref } = useParams();
  // console.log("wallet1",wallet);
  const navigate = useNavigate();
  const [sponsor, setSponsor] = useState('');
  useEffect(() => {
    if (ref) {
      setSponsor(ref);
    }
  }, [ref]);
  const handleRegister = async () => {
    if (!wallet) {
      notifyError("Wallet not connected");
      return;
    }
    if (!sponsor || sponsor.trim() === "") {
      notifyError("Invitation Code is required");
      return;
    }

    const confirmRegister = window.confirm(
      `You are about to register with invitation code: ${sponsor}. Continue?`
    );

    if (!confirmRegister) return;
    try {
      const registered = await checkUserRegistered(wallet);
      if (registered) {
        notifySuccess("Wallet already registered!");
        setTimeout(() => navigate("/dashboard"), 1500);
        return;
      }

      await registerUser(wallet, sponsor);
      notifySuccess("Registration successful!");
      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err) {
      console.error(err);
      notifyError("Registration failed");
    }

  };
  return (
    <>

      <div className="container">
        <section className="login-wrapper">
          <div className="login-form">
            <div className="logo">
              <img src={logo} alt="MemeRadar" />
            </div>

            <div className="login-form-header border-0 mb-0  text-white">
              <h1>Get Started</h1>
              <p>Create a secure account with your Solana Wallet address.</p>
            </div>
            <div className="login-form-body">
              <div className="mb-3 text-center">
                <label className="text-warning">Invitation Code</label>
                <input type="text" className="form-control text-center" placeholder="" value={sponsor}
                  onChange={(e) => {
                    setSponsor(e.target.value)
                  }} />
              </div>
              <div className="mb-3 text-center">
                <label className="text-warning">Select Country</label>
                <select className="form-control" >
                  <option data-tokens="Select Country" value="0">Select Country</option>
                  <option data-tokens="Others" value="1">Others</option>
                  <option data-tokens="Afghanistan" value="93">Afghanistan</option>

                  <option data-tokens="Albania" value="355">Albania</option>

                  <option data-tokens="Algeria" value="213">Algeria</option>

                  <option data-tokens="American Samoa" value="684">American Samoa</option>

                  <option data-tokens="Andorra" value="376">Andorra</option>

                  <option data-tokens="Angola" value="244">Angola</option>

                  <option data-tokens="Antigua And Barbuda" value="1268">Antigua And Barbuda
                  </option>

                  <option data-tokens="Argentina" value="54">Argentina</option>

                  <option data-tokens="Armenia" value="374">Armenia</option>

                  <option data-tokens="Aruba" value="297">Aruba</option>

                  <option data-tokens="Australia" value="61">Australia</option>

                  <option data-tokens="Austria" value="43">Austria</option>

                  <option data-tokens="Azerbaijan" value="994">Azerbaijan</option>

                  <option data-tokens="Bahrain" value="973">Bahrain</option>

                  <option data-tokens="Bangladesh" value="880">Bangladesh</option>

                  <option data-tokens="Barbados" value="246">Barbados</option>

                  <option data-tokens="Belarus" value="375">Belarus</option>

                  <option data-tokens="Belgium" value="32">Belgium</option>

                  <option data-tokens="Belize" value="501">Belize</option>

                  <option data-tokens="Benin" value="229">Benin</option>

                  <option data-tokens="Bermuda" value="441">Bermuda</option>

                  <option data-tokens="Bhutan" value="975">Bhutan</option>

                  <option data-tokens="Bolivia" value="591">Bolivia</option>

                  <option data-tokens="Bosnia And Herzegovina" value="387">Bosnia And Herzegovina
                  </option>

                  <option data-tokens="Botswana" value="267">Botswana</option>

                  <option data-tokens="Brazil" value="55">Brazil</option>

                  <option data-tokens="Brunei Darussalam" value="673">Brunei Darussalam</option>

                  <option data-tokens="Bulgaria" value="359">Bulgaria</option>

                  <option data-tokens="Burkina Faso" value="226">Burkina Faso</option>

                  <option data-tokens="Burundi" value="257">Burundi</option>

                  <option data-tokens="Cambodia " value="855">Cambodia </option>

                  <option data-tokens="Cameroon" value="237">Cameroon</option>

                  <option data-tokens="Canada" value="1222">Canada</option>

                  <option data-tokens="Cape Verde" value="238">Cape Verde</option>

                  <option data-tokens="Cayman Islands" value="345">Cayman Islands</option>

                  <option data-tokens="Central African Republic" value="236">Central African
                    Republic</option>

                  <option data-tokens="Chad" value="235">Chad</option>

                  <option data-tokens="Chile" value="56">Chile</option>

                  <option data-tokens="China" value="86">China</option>

                  <option data-tokens="Cocos (Keeling) Islands" value="891">Cocos (Keeling)
                    Islands</option>

                  <option data-tokens="Colombia" value="57">Colombia</option>

                  <option data-tokens="Comoros" value="269">Comoros</option>

                  <option data-tokens="Congo" value="242">Congo</option>

                  <option data-tokens="Congo (Democratic Republic)" value="243">Congo (Democratic
                    Republic)</option>

                  <option data-tokens="Cook Islands" value="682">Cook Islands</option>

                  <option data-tokens="Costa Rica" value="506">Costa Rica</option>

                  <option data-tokens="Cote D'Ivoire" value="225">Cote D'Ivoire</option>

                  <option data-tokens="Croatia" value="385">Croatia</option>

                  <option data-tokens="Cuba" value="53">Cuba</option>

                  <option data-tokens="Cyprus" value="357">Cyprus</option>

                  <option data-tokens="Czech Republic" value="420">Czech Republic</option>

                  <option data-tokens="Denmark" value="45">Denmark</option>

                  <option data-tokens="Djibouti" value="253">Djibouti</option>

                  <option data-tokens="Dominica" value="767">Dominica</option>

                  <option data-tokens="Dominican Republic" value="5005">Dominican Republic
                  </option>

                  <option data-tokens="Ecuador" value="593">Ecuador</option>

                  <option data-tokens="Egypt" value="20">Egypt</option>

                  <option data-tokens="El Salvador" value="503">El Salvador</option>

                  <option data-tokens="Equatorial Guinea" value="240">Equatorial Guinea</option>

                  <option data-tokens="Eritrea" value="291">Eritrea</option>

                  <option data-tokens="Estonia" value="372">Estonia</option>

                  <option data-tokens="Ethiopia" value="251">Ethiopia</option>

                  <option data-tokens="Falkland Islands (Malvinas)" value="500">Falkland Islands
                    (Malvinas)</option>

                  <option data-tokens="Faroe Islands" value="298">Faroe Islands</option>

                  <option data-tokens="Fiji" value="679">Fiji</option>

                  <option data-tokens="Finland" value="358">Finland</option>

                  <option data-tokens="France" value="33">France</option>

                  <option data-tokens="French Guiana" value="594">French Guiana</option>

                  <option data-tokens="French Polynesia" value="689">French Polynesia</option>

                  <option data-tokens="Gabon" value="241">Gabon</option>

                  <option data-tokens="Gambia" value="220">Gambia</option>

                  <option data-tokens="Georgia" value="995">Georgia</option>

                  <option data-tokens="Germany" value="49">Germany</option>

                  <option data-tokens="Ghana" value="233">Ghana</option>

                  <option data-tokens="Gibraltar" value="350">Gibraltar</option>

                  <option data-tokens="Greece" value="30">Greece</option>

                  <option data-tokens="Greenland" value="299">Greenland</option>

                  <option data-tokens="Grenada" value="473">Grenada</option>

                  <option data-tokens="Guadeloupe" value="5004">Guadeloupe</option>

                  <option data-tokens="Guam" value="671">Guam</option>

                  <option data-tokens="Guatemala" value="502">Guatemala</option>

                  <option data-tokens="Guinea" value="224">Guinea</option>

                  <option data-tokens="Guinea-Bissau" value="245">Guinea-Bissau</option>

                  <option data-tokens="Guyana" value="592">Guyana</option>

                  <option data-tokens="Haiti" value="509">Haiti</option>

                  <option data-tokens="Heard Island and McDonald Islands" value="5002">Heard
                    Island and McDonald Islands</option>

                  <option data-tokens="Honduras" value="504">Honduras</option>

                  <option data-tokens="Hong Kong" value="852">Hong Kong</option>

                  <option data-tokens="Hungary" value="36">Hungary</option>

                  <option data-tokens="Iceland" value="354">Iceland</option>

                  <option data-tokens="India" value="91">India</option>

                  <option data-tokens="Indonesia" value="62">Indonesia</option>

                  <option data-tokens="Iran, Islamic Republic Of" value="98">Iran, Islamic
                    Republic Of</option>

                  <option data-tokens="Iraq" value="964">Iraq</option>

                  <option data-tokens="Ireland" value="353">Ireland</option>

                  <option data-tokens="Israel" value="972">Israel</option>

                  <option data-tokens="Italy" value="39">Italy</option>

                  <option data-tokens="Jamaica" value="876">Jamaica</option>

                  <option data-tokens="Japan" value="81">Japan</option>

                  <option data-tokens="Jersey" value="1534">Jersey</option>

                  <option data-tokens="Jordan" value="962">Jordan</option>

                  <option data-tokens="Kazakhstan" value="5001">Kazakhstan</option>

                  <option data-tokens="Kenya" value="254">Kenya</option>

                  <option data-tokens="Kiribati" value="686">Kiribati</option>

                  <option data-tokens="Korea, Democratic People'S Republic Of" value="850">Korea,
                    Democratic People'S Republic Of</option>

                  <option data-tokens="Korea, Republic Of" value="82">Korea, Republic Of</option>

                  <option data-tokens="Kosovo" value="383">Kosovo</option>

                  <option data-tokens="Kuwait" value="965">Kuwait</option>

                  <option data-tokens="Kyrgyzstan" value="996">Kyrgyzstan</option>

                  <option data-tokens="Laos" value="856">Laos</option>

                  <option data-tokens="Latvia" value="371">Latvia</option>

                  <option data-tokens="Lebanon" value="961">Lebanon</option>

                  <option data-tokens="Lesotho" value="266">Lesotho</option>

                  <option data-tokens="Liberia" value="231">Liberia</option>

                  <option data-tokens="Libyan Arab Jamahiriya" value="218">Libyan Arab Jamahiriya
                  </option>

                  <option data-tokens="Liechtenstein" value="423">Liechtenstein</option>

                  <option data-tokens="Lithuania" value="370">Lithuania</option>

                  <option data-tokens="Luxembourg" value="352">Luxembourg</option>

                  <option data-tokens="Macao" value="853">Macao</option>

                  <option data-tokens="Macedonia, The Former Yugoslav Republic Of" value="389">
                    Macedonia, The Former Yugoslav Republic Of</option>

                  <option data-tokens="Madagascar" value="261">Madagascar</option>

                  <option data-tokens="Malawi" value="265">Malawi</option>

                  <option data-tokens="Malaysia" value="60">Malaysia</option>

                  <option data-tokens="Maldives" value="960">Maldives</option>

                  <option data-tokens="Mali" value="223">Mali</option>

                  <option data-tokens="Malta" value="356">Malta</option>

                  <option data-tokens="Marshall Islands" value="692">Marshall Islands</option>

                  <option data-tokens="Martinique" value="596">Martinique</option>

                  <option data-tokens="Mauritania" value="222">Mauritania</option>

                  <option data-tokens="Mauritius" value="230">Mauritius</option>

                  <option data-tokens="Mayotte" value="262">Mayotte</option>

                  <option data-tokens="Mexico" value="52">Mexico</option>

                  <option data-tokens="Micronesia, Federated States Of" value="691">Micronesia,
                    Federated States Of</option>

                  <option data-tokens="Moldova, Republic Of" value="373">Moldova, Republic Of
                  </option>

                  <option data-tokens="Monaco" value="377">Monaco</option>

                  <option data-tokens="Mongolia" value="976">Mongolia</option>

                  <option data-tokens="Montenegro" value="382">Montenegro</option>

                  <option data-tokens="Montserrat" value="664">Montserrat</option>

                  <option data-tokens="Morocco" value="212">Morocco</option>

                  <option data-tokens="Mozambique" value="258">Mozambique</option>

                  <option data-tokens="Myanmar" value="95">Myanmar</option>

                  <option data-tokens="Namibia" value="264">Namibia</option>

                  <option data-tokens="Nauru" value="674">Nauru</option>

                  <option data-tokens="Nepal" value="977">Nepal</option>

                  <option data-tokens="Netherlands" value="31">Netherlands</option>

                  <option data-tokens="Netherlands Antilles" value="599">Netherlands Antilles
                  </option>

                  <option data-tokens="New Caledonia" value="687">New Caledonia</option>

                  <option data-tokens="New Zealand" value="64">New Zealand</option>

                  <option data-tokens="Nicaragua" value="505">Nicaragua</option>

                  <option data-tokens="Niger" value="227">Niger</option>

                  <option data-tokens="Nigeria" value="234">Nigeria</option>

                  <option data-tokens="Niue" value="683">Niue</option>

                  <option data-tokens="Norfolk Island" value="672">Norfolk Island</option>

                  <option data-tokens="Northern Mariana Islands" value="670">Northern Mariana
                    Islands</option>

                  <option data-tokens="Norway" value="47">Norway</option>

                  <option data-tokens="Oman" value="968">Oman</option>

                  <option data-tokens="Pakistan" value="92">Pakistan</option>

                  <option data-tokens="Palau" value="680">Palau</option>

                  <option data-tokens="Palestine" value="970">Palestine</option>

                  <option data-tokens="Panama" value="507">Panama</option>

                  <option data-tokens="Papua New Guinea" value="675">Papua New Guinea</option>

                  <option data-tokens="Paraguay" value="595">Paraguay</option>

                  <option data-tokens="Peru" value="51">Peru</option>

                  <option data-tokens="Philippines" value="63">Philippines</option>

                  <option data-tokens="Pitcairn" value="872">Pitcairn</option>

                  <option data-tokens="Poland" value="48">Poland</option>

                  <option data-tokens="Portugal" value="351">Portugal</option>

                  <option data-tokens="Qatar" value="974">Qatar</option>

                  <option data-tokens="Romania" value="40">Romania</option>

                  <option data-tokens="Russian Federation" value="7">Russian Federation</option>

                  <option data-tokens="Rwanda" value="250">Rwanda</option>

                  <option data-tokens="Saint Barthelemy" value="590">Saint Barthelemy</option>

                  <option data-tokens="Saint Lucia" value="758">Saint Lucia</option>

                  <option data-tokens="Saint Martin (FR)" value="5003">Saint Martin (FR)</option>

                  <option data-tokens="Saint Pierre And Miquelon" value="508">Saint Pierre And
                    Miquelon</option>

                  <option data-tokens="Samoa" value="685">Samoa</option>

                  <option data-tokens="San Marino" value="378">San Marino</option>

                  <option data-tokens="Sao Tome and Principe" value="239">Sao Tome and Principe
                  </option>

                  <option data-tokens="Saudi Arabia" value="966">Saudi Arabia</option>

                  <option data-tokens="Senegal" value="221">Senegal</option>

                  <option data-tokens="Serbia And Montenegro" value="381">Serbia And Montenegro
                  </option>

                  <option data-tokens="Seychelles" value="248">Seychelles</option>

                  <option data-tokens="Sierra Leone" value="232">Sierra Leone</option>

                  <option data-tokens="Singapore" value="65">Singapore</option>

                  <option data-tokens="Slovakia" value="421">Slovakia</option>

                  <option data-tokens="Slovenia" value="386">Slovenia</option>

                  <option data-tokens="Solomon Islands" value="677">Solomon Islands</option>

                  <option data-tokens="Somalia" value="252">Somalia</option>

                  <option data-tokens="South africa" value="27">South africa</option>

                  <option data-tokens="South Georgia" value="0">South Georgia</option>

                  <option data-tokens="Spain" value="34">Spain</option>

                  <option data-tokens="Sri Lanka" value="94">Sri Lanka</option>

                  <option data-tokens="Sudan" value="249">Sudan</option>

                  <option data-tokens="Suriname" value="597">Suriname</option>

                  <option data-tokens="Swaziland" value="268">Swaziland</option>

                  <option data-tokens="Sweden" value="46">Sweden</option>

                  <option data-tokens="Switzerland" value="41">Switzerland</option>

                  <option data-tokens="Syria" value="963">Syria</option>

                  <option data-tokens="Taiwan,the Republic of China" value="886">Taiwan,the
                    Republic of China</option>

                  <option data-tokens="Tajikistan" value="992">Tajikistan</option>

                  <option data-tokens="Tanzania" value="255">Tanzania</option>

                  <option data-tokens="Thailand" value="66">Thailand</option>

                  <option data-tokens="Togo" value="228">Togo</option>

                  <option data-tokens="Tokelau" value="690">Tokelau</option>

                  <option data-tokens="Tonga" value="676">Tonga</option>

                  <option data-tokens="Tunisia" value="216">Tunisia</option>

                  <option data-tokens="Turkey" value="90">Turkey</option>

                  <option data-tokens="Turkmenistan" value="993">Turkmenistan</option>

                  <option data-tokens="Tuvalu" value="688">Tuvalu</option>

                  <option data-tokens="Uganda" value="256">Uganda</option>

                  <option data-tokens="Ukraine" value="380">Ukraine</option>

                  <option data-tokens="United Arab Emirates" value="971">United Arab Emirates
                  </option>

                  <option data-tokens="United Kingdom" value="44">United Kingdom</option>

                  <option data-tokens="Uruguay" value="598">Uruguay</option>

                  <option data-tokens="USA - United States of America" value="2001">USA - United
                    States of America</option>

                  <option data-tokens="Uzbekistan" value="998">Uzbekistan</option>

                  <option data-tokens="Vanuatu " value="678">Vanuatu </option>

                  <option data-tokens="Venezuela" value="58">Venezuela</option>

                  <option data-tokens="Vietnam" value="84">Vietnam</option>

                  <option data-tokens="Wallis and Futuna" value="681">Wallis and Futuna</option>

                  <option data-tokens="Yemen" value="967">Yemen</option>

                  <option data-tokens="Zambia" value="260">Zambia</option>

                  <option data-tokens="Zimbabwe" value="263">Zimbabwe</option>

                </select>
                <div id="otherInput" style={{ display: "none" }} className="mt-2">
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <a href="#" className="btn btn-primary d-block" onClick={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}>
                  Register Now
                </a>
              </div>
              <div className="text-center  text-white">
                Already have an account? <Link to="/login" className="text-underline text-white">Login</Link>
              </div>
            </div>
          </div>
        </section>
        <div className="copyRight">
          MemeRadar © 2026. All Rights Reserved.
        </div>

      </div>

    </>
  )
}

export default Register