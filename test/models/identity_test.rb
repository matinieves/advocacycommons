require 'test_helper'
require 'minitest/mock'

class IdentityTest < ActiveSupport::TestCase
  test '#find_for_oauth' do
    auth = Minitest::Mock.new
    credentials = Minitest::Mock.new
    uid = Identity.first.uid

    auth.expect :provider, 'facebook'
    auth.expect :uid, uid
    credentials.expect :token, 'access_token'
    auth.expect :credentials, credentials

    assert_equal false, Identity.find_for_oauth(auth).new_record?, 'Should return an existing identity'

    auth.expect :provider, 'facebook'
    auth.expect :uid, "#{uid}example2"
    credentials.expect :token, 'access_token'
    auth.expect :credentials, credentials

    assert Identity.find_for_oauth(auth).new_record?, 'Should create a new identity'
  end
end
