<?php
/* some php program */
$hname=$_SERVER['SERVER_NAME'];
$phpvar='hello from Server Template: '.$hname;

/* load html, ��������htmlģ���������php���� -- ��������ģ�� */
include dirname(__FILE__) . '/index.html';
/* echo 'host:'.$hname.'<br>'; */
