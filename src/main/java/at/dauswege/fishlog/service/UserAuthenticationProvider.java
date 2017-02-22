package at.dauswege.fishlog.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import at.dauswege.fishlog.entity.Person;
import at.dauswege.fishlog.repository.rest.PersonRepository;

@Service
public class UserAuthenticationProvider implements AuthenticationProvider {

  @Autowired
  private PersonRepository personRepository;

  @Autowired
  private BCryptPasswordEncoder bcCryptPasswordEncoder;

  @Override
  public Authentication authenticate(Authentication auth) throws AuthenticationException {

    String userName = auth.getName();
    if (userName == null) {
      throw new AuthenticationCredentialsNotFoundException("wrong username or password");
    }

    Person person = personRepository.findOneByMailAddressOrUsername(userName, userName);
    if (person == null) {
      throw new AuthenticationCredentialsNotFoundException("wrong username or password");
    }

    if (bcCryptPasswordEncoder.matches((String) auth.getCredentials(), person.getPassword())) {
      List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
      grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
      Authentication authentication = new UsernamePasswordAuthenticationToken(person.getId(),
          auth.getCredentials(), grantedAuthorities);
      return authentication;
    }

    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public boolean supports(Class<?> arg0) {

    // TODO Auto-generated method stub
    return true;
  }
}
