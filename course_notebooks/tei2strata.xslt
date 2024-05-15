<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0">
  <xsl:output method="text" encoding="UTF-8"/>

  <!-- Match the root element -->
  <xsl:template match="/">
    <xsl:text>id,label,strata&#10;</xsl:text>
    <!-- Apply templates to select text nodes under the specified path -->
    <xsl:apply-templates select="//tei:l[.//tei:f[@name='strata']]"/>
  </xsl:template>

  <!-- Match the 'l' elements with 'strata' attributes -->
  <xsl:template match="tei:l[.//tei:f[@name='strata']]">
    <!-- Output the id, label, and strata -->
    <xsl:value-of select="@xml:id"/>
    <xsl:text>,</xsl:text>
    <xsl:value-of select=".//tei:f[@name='label']"/>
    <xsl:text>,</xsl:text>
    <xsl:value-of select=".//tei:f[@name='strata']"/>
    <xsl:text>&#10;</xsl:text>
  </xsl:template>
</xsl:stylesheet>
