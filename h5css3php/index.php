<?php
/* some php program */
$hname=$_SERVER['SERVER_NAME'];
$phpvar='hello from Server: '.$hname;


/* load html, ��������htmlģ���������php���� */
include dirname(__FILE__) . '/tpl.html';
/* echo 'host:'.$hname.'<br>'; */
